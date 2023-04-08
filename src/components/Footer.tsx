import React from "react"

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <div className="footer">
      <div className="copyright">
        <p>Copyright &copy; bitesizeadventure {year}</p>
      </div>
    </div>
  )
}
