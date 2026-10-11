import React from 'react';

// Optional Component Override: Adds subtle heart indicator decoration to bubble messages
export default function BubbleMessage(props: any) {
  // @ts-ignore - <Original /> is provided by Lumiverse runtime
  return (
    <div style={{ position: 'relative' }}>
      <Original {...props} />
      <span
        style={{
          position: 'absolute',
          top: '6px',
          right: '10px',
          color: 'rgba(242, 133, 173, 0.4)',
          fontSize: '0.75rem',
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        ♡
      </span>
    </div>
  );
}
