import React from "react";

function Footer() {
  let id = 0;
  const socialFooter = [
    {
      id: ++id,
      href: "https://github.com/heshamabdelazim",
      className: "icon-github",
    },
    {
      id: ++id,
      href: "https://www.linkedin.com/in/hesham-abdelazim-kamel-678759283",
      className: "icon-linkedin",
    },
    {
      id: ++id,
      href: "https://wa.me/+201212005626",
      className: "icon-whatsapp",
    },
  ];
  return (
    <div className="footer  d-flex justify-content-center align-items-center">
      <div className="left p-3 text-center">
        <p className="m-0">Developed By:</p>
        <h3 className="m-0">Hesham Abdelazim Kamel</h3>
      </div>
      <div className="right d-flex flex-wrap justify-content-center gap-3 p-3">
        {socialFooter.map((obj) => (
          <a
            key={obj.id}
            href={obj.href}
            className={obj.className}
            target="_blank"
          />
        ))}
      </div>
    </div>
  );
}
export default Footer;
