import * as React from 'react';
import { Html } from '@react-email/components';

interface Props {
  message: string;
}

export function Email({ message }: Props) {
  return (
    <Html lang="jp">
      <body>
        {message}
      </body>
    </Html>
  );
}
