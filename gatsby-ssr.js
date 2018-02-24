import React from 'react';
import { stripIndent } from 'common-tags';

exports.onRenderBody = (
  { setHeadComponents, setPreBodyComponents },
  pluginOptions
) => {
  if (process.env.NODE_ENV === `production`) {
    setHeadComponents([
      <script
        async
        src="https://www.googletagmanager.com/gtag/js?id=UA-98114991-2"
      />,
      <script
        key="plugin-google-tagmanager"
        dangerouslySetInnerHTML={{
          __html: stripIndent`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'UA-98114991-2');`,
        }}
      />,
    ]);

    setPreBodyComponents([
      <noscript
        key="plugin-google-tagmanager"
        dangerouslySetInnerHTML={{
          __html: stripIndent`
            <iframe
              src="https://www.googletagmanager.com/gtag/js?id=UA-98114991-2"
              height="0"
              width="0"
              style="display: none; visibility: hidden"
            ></iframe>`,
        }}
      />,
    ]);
  }
};
