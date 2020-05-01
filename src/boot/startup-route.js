// import something here

// "async" is optional
export default async ({ urlPath, redirect }) => {
  if (urlPath != "/#/") {
    redirect("/");
  }
};
