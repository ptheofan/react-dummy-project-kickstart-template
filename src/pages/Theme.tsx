export default function ThemePage() {
  const variables = [
    '--background',
    '--foreground',
    '--card',
    '--card-foreground',
    '--popover',
    '--popover-foreground',
    '--primary',
    '--primary-foreground',
    '--secondary',
    '--secondary-foreground',
    '--muted',
    '--muted-foreground',
    '--accent',
    '--accent-foreground',
    '--destructive',
    '--destructive-foreground',
    '--border',
    '--input',
    '--ring',
  ];

  return (
    <>
      <div className={ `flex flex-row flex-wrap gap-4 m-20` }>
        { variables.map((variable) => (
          <div key={ variable } className={ `flex flex-col w-36 h-36` }>
            <div className={`w-full h-full border`} style={ { background: `hsl(var(${ variable }))` } }></div>
            <div className={ `text-wrap break-words hover:text-clip` }>{ variable }</div>
          </div>
        )) }
      </div>
    </>
  );
}
