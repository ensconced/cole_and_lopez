import "./instagram-hydrate";

const clientToken = "b3ce92708d41bce35307e293b3804606";
const appID = "937463676763777";
const accessToken = `${appID}|${clientToken}`;

async function main() {
  const response = await fetch(
    "https://www.instagram.com/graphql/query/?query_hash=42323d64886122307be10013ad2dcc44&variables={%22id%22:%228251130873%22,%22first%22:4}"
  );
  const data = await response.json();
  debugger;
  const postIds = data.data.user.edge_owner_to_timeline_media.edges.map(
    (edge) => edge.node.shortcode
  );
  const posts = await Promise.all(
    postIds.map(async (postId) => {
      const url = `https://graph.facebook.com/v8.0/instagram_oembed?url=https://www.instagram.com/p/${postId}/&access_token=${accessToken}`;
      const response = await fetch(url);
      const { html } = await response.json();
      return html;
    })
  );
  posts.forEach((post) => {
    const el = document.createElement("div");
    el.style.width = "326px";
    el.style.border = "5px solid blue";
    el.innerHTML = post;
    document.body.appendChild(el);
  });
  instgrm.Embeds.process();
}

main();
