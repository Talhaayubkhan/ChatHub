// import React from "react";
// import { Helmet } from "react-helmet-async";
// const Title = ({
//   title = "Chat App",
//   description = "Chat App called ChatHub",
// }) => {
//   return (
//     <Helmet>
//       <title>{title}</title>
//       <meta name="description" content={description} />
//     </Helmet>
//   );
// };

// export default Title;

import React from "react";
import { Helmet } from "react-helmet-async";

const Title = ({
  title = "Chat App",
  description = "Chat App called ChatHub",
  meta = [],
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {meta.map((tag, index) => (
        <meta key={index} {...tag} />
      ))}
    </Helmet>
  );
};

export default React.memo(Title);
