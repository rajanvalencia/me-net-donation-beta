// email.tsx
import * as React from 'react';
import { Html, Button } from '@react-email/components';

interface Props {
  url : string
}

export function Email({url} : Props) {
  return (
    <Html lang="en">
      <body>
        hello world <br />
        testing the mail
      </body>
      <Button href={url}>Just rendering exmple.com Click me</Button>
    </Html>
  );
}
