import { PassThrough } from "node:stream";

import type { EntryContext } from "@remix-run/node";
import { Response } from "@remix-run/node";
import { RemixServer } from "@remix-run/react";
import isbot from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { ServerStyleSheet } from "styled-components";

const ABORT_DELAY = 5_000;

const styleSheet = new ServerStyleSheet();

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  return isbot(request.headers.get("user-agent"))
    ? handleBotRequest(
        request,
        responseStatusCode,
        responseHeaders,
        remixContext
      )
    : handleBrowserRequest(
        request,
        responseStatusCode,
        responseHeaders,
        remixContext
      );
}

function handleBotRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  return new Promise((resolve, reject) => {
    const { pipe, abort } = renderToPipeableStream(
      styleSheet.collectStyles(
        <RemixServer
          context={remixContext}
          url={request.url}
          abortDelay={ABORT_DELAY}
        />
      ),
      {
        // use onShellReady to wait until a suspense boundary is triggered
        onShellReady() {
          responseHeaders.set("Content-Type", "text/html");
          const body = new PassThrough({
            transform: (chunk, _, done) => {
              // perform previous behaviour and replace the "__STYLES__" placeholder as it's streamed to the client
              const stringChunk = (chunk as Buffer).toString();
              done(
                undefined,
                Buffer.from(
                  stringChunk.replace("__STYLES__", styleSheet.getStyleTags())
                )
              );
            },
          });
          pipe(body);
          resolve(
            new Response(body, {
              headers: responseHeaders,
              status: responseStatusCode,
            })
          );
        },
        onShellError(err: unknown) {
          reject(err);
        },
        onError(err: unknown) {
          console.error(err);
          responseStatusCode = 500;
        },
      }
    );

    setTimeout(abort, ABORT_DELAY);
  });
}

function handleBrowserRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  return new Promise((resolve, reject) => {
    const { pipe, abort } = renderToPipeableStream(
      styleSheet.collectStyles(
        <RemixServer
          context={remixContext}
          url={request.url}
          abortDelay={ABORT_DELAY}
        />
      ),
      {
        // use onShellReady to wait until a suspense boundary is triggered
        onShellReady() {
          responseHeaders.set("Content-Type", "text/html");
          const body = new PassThrough({
            transform: (chunk, _, done) => {
              // perform previous behaviour and replace the "__STYLES__" placeholder as it's streamed to the client
              const stringChunk = (chunk as Buffer).toString();
              done(
                undefined,
                Buffer.from(
                  stringChunk.replace("__STYLES__", styleSheet.getStyleTags())
                )
              );
            },
          });
          pipe(body);
          resolve(
            new Response(body, {
              headers: responseHeaders,
              status: responseStatusCode,
            })
          );
        },
        onShellError(err: unknown) {
          reject(err);
        },
        onError(err: unknown) {
          console.error(err);
          responseStatusCode = 500;
        },
      }
    );

    setTimeout(abort, ABORT_DELAY);
  });
}
