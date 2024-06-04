// email.tsx
import * as React from 'react';
import { Html, Button } from '@react-email/components';

interface Props {
  message : string
}

export function Email({message} : Props) {
  return (
    <Html lang="jp">
      <body>
        {message}
      </body>
    </Html>
  );
}
