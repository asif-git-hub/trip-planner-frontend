import React from "react"

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <div className="footer">
      <div className="copyright">
        <p>Copyright &copy; enchantrek {year}</p>
      </div>
      <div className="privacy-and-terms">
        <a href="/privacy">Privacy | </a>
        <a href="/terms">Terms & Condition</a>
      </div>
    </div>
  )
}
