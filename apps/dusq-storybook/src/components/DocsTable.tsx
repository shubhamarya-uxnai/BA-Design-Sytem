import React from 'react';

interface PropDef {
  name: string;
  type: string;
  defaultValue?: string;
  description: string;
}

interface DocsTableProps {
  title: string;
  description: string;
  componentPath?: string;
  tokensUsed?: { name: string; cssVar: string; role: string }[];
  props?: PropDef[];
}

export function DocsTable({
  title,
  description,
  componentPath,
  tokensUsed,
  props,
}: DocsTableProps) {
  const copyVar = async (val: string) => {
    await navigator.clipboard?.writeText(val);
  };

  return (
    <div className="docs-panel-content">
      <div className="docs-header">
        <h2 className="docs-title">{title}</h2>
        <p className="docs-desc">{description}</p>
        {componentPath && (
          <div className="docs-source-pill">
            <span className="source-label">Component Source:</span>
            <code>{componentPath}</code>
          </div>
        )}
      </div>

      {props && props.length > 0 && (
        <div className="docs-section">
          <h3 className="docs-section-heading">Component Props</h3>
          <div className="props-table-wrapper">
            <table className="props-table">
              <thead>
                <tr>
                  <th>Prop</th>
                  <th>Type</th>
                  <th>Default</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {props.map(p => (
                  <tr key={p.name}>
                    <td>
                      <code className="prop-name">{p.name}</code>
                    </td>
                    <td>
                      <code className="prop-type">{p.type}</code>
                    </td>
                    <td>
                      <span className="prop-default">{p.defaultValue || '—'}</span>
                    </td>
                    <td>
                      <span className="prop-desc">{p.description}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tokensUsed && tokensUsed.length > 0 && (
        <div className="docs-section">
          <h3 className="docs-section-heading">Design Tokens Referenced</h3>
          <div className="tokens-table-wrapper">
            <table className="tokens-table">
              <thead>
                <tr>
                  <th>Token Variable</th>
                  <th>Name</th>
                  <th>Role</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {tokensUsed.map(t => (
                  <tr key={t.cssVar}>
                    <td>
                      <code className="token-var">{t.cssVar}</code>
                    </td>
                    <td>{t.name}</td>
                    <td className="token-role">{t.role}</td>
                    <td>
                      <button
                        type="button"
                        className="copy-mini-btn"
                        onClick={() => copyVar(t.cssVar)}
                        title="Copy CSS variable"
                      >
                        Copy
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
