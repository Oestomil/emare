// Kişi -> Instagram kullanıcı adı / tam URL
const instaLinks = {
  "azize.g":   { label: "azize.g",   username: "azize.g" },
  bedirhan_35:{ label: "bedirhan_35",username: "bedirhan_35" },
  kamilsenn:   { label: "kamilsenn",username: "kamilsenn" },
};

// URL üretici (kullanıcı adı veya tam url)
export const toInstaUrl = (u) =>
  /^https?:\/\//.test(u) ? u : `#/insta/${u}`;

export default instaLinks;
