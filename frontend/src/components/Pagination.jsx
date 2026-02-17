import React from "react";

export default function Pagination({ page, totalPages, onPage }) {
  if (!totalPages || totalPages <= 1) return null;

  return (
    <div className="pagination">
      <button className="btn" disabled={page <= 1} onClick={() => onPage(page - 1)}>
        ← Précédent
      </button>
      <span className="muted">Page {page} / {totalPages}</span>
      <button className="btn" disabled={page >= totalPages} onClick={() => onPage(page + 1)}>
        Suivant →
      </button>
    </div>
  );
}
