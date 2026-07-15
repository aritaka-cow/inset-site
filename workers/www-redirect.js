const canonicalOrigin = "https://inset.page";

export default {
  fetch(request) {
    const destination = new URL(request.url);
    destination.protocol = "https:";
    destination.hostname = "inset.page";
    destination.port = "";

    return Response.redirect(`${canonicalOrigin}${destination.pathname}${destination.search}`, 301);
  }
};
