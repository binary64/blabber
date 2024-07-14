import { ReactNode } from 'react';

export default function Card({
  title,
  buttons,
  children,
}: React.PropsWithChildren<{
  title: ReactNode;
  buttons: Array<[string, string, () => Promise<void> | void]>;
}>) {
  return (
    <div className="card bordered shadow-lg hover:shadow-xl">
      <div className="card-body hover:shadow-inner">
        <h2 className="card-title">{title}</h2>
        <p>{children}</p>
        <div className="card-actions">
          {buttons.map(([text, type, onClick]) => (
            <a
              key={text}
              className={`btn btn-${type}`}
              onClick={onClick}
            >
              {text}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
