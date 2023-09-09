export const filterUrl = (url) => {
  if (!url.includes("http")) {
    url = "https://" + url;
  }
  if (!url.endsWith("/")) {
    url = url + "/";
  }
  if (url.endsWith("/landing/index/")) {
    url = url.replace("landing/index/", "");
  }
  if (url.endsWith("/index.aspx/")) {
    url = url.replace("/index.aspx/", "/");
  }
  if (url.endsWith(".ne/")) {
    url = url.replace(".ne/", ".net/");
  }
  if (url.endsWith(".co/")) {
    url = url.replace(".co/", ".com/")
  }


  if (url === "https://www.elmhurst.edu/")
    url = "https://elmhurstbluejays.com/";
  if (url === "https://www.brynmawr.edu/athletics/")
    url = "https://gobrynmawr.com/";
  if (url === "https://www.rose-hulman.edu/athletics/")
    url = "https://athletics.rose-hulman.edu/";
  if (url === "https://www.whitman.edu/athletics/")
    url = "https://athletics.whitman.edu/";
  if (url === "https://www.valpoathletics.com/")
    url = "https://www.valpoathletics.com/home/main/";
  if (url === "https://www.salem.edu/athletics")
    url = "https://salemspirits.com/";
  if (url === "https://www.rochester.edu/athletics/")
    url = "https://uofrathletics.com/";
  if (url === "https://www.nyack.edu/athletics/")
    url = "https://athletics.nyack.edu/index";
  if (url === "https://www.tamiu.edu/athletics/")
    url = "https://godustdevils.com/";
  if (url === "https://www.skidmore.edu/athletics/")
    url = "https://skidmoreathletics.com/";
  if (url === "https://www.rochester.edu/athletics/")
    url = "https://uofrathletics.com/";
  if (url === "https://www.bcuathetics.com/")
    url = "https://www.bcuathletics.com/";
  if (url === "https://www.delval.edu/athletics/")
    url = "https://athletics.delval.edu/";
  if (url === "https://www.delval.edu/athletics/")
    url = "https://athletics.delval.edu/";
  if (url === "https://www.dbq.edu/Athletics/") url = "https://udspartans.com/";
  if (url === "https://\//lrtrojans.com/") url = "https://lrtrojans.com/";
  if (url === "https://www.ramblinwreck.com/")
    url = "https://ramblinwreck.com/";
  if (url === "https://www.richmondspiders.edu/")
    url = "https://richmondspiders.com/";
  if (url === "https://www.nusports.com/") url = "https://nusports.com/";
  if (url === "https://www.und.com/") url = "https://und.com/";

  return url;
};
