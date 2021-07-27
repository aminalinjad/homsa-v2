// import auth from "@/tools/authentication";
// export default function({ $axios, redirect, app}) {
export default function({ $axios}) {
  // $axios.setBaseURL("http://46.4.221.181:8000/api/");

  $axios.onRequest((config) => {
    console.log('here is on request in axios plugin' , config.headers)
    // config.headers.common['Content-Type'] = 'application/json'; 
    //Auth token if token exist,set it on header request
    // let token = auth.getToken();

    // if (token)
      // config.headers.common['Authorization'] = `Bearer ${token}`;
      
  })
  $axios.onResponse(res => {
      console.log('here is res in axios plugin', res);
    // if (res.status === 201) {
    //   modalManager(res.data.message, "success", app);
    // }
    // if (res.status === 200) {
    //   if (res.data.error === 40101) {
    //     res.data.messages.forEach(e => {
    //       modalManager(e, "error", app);
    //     });
    //   }
    //   if (res.data.error === 40102) {
    //     res.data.messages.forEach(e => {
    //       modalManager(e, "error", app);
    //     });
    //   }
    //   if (res.data.error === 40103) {
    //     res.data.messages.forEach(e => {
    //       modalManager(e, "error", app);
    //     });
    //   }
    //   if (res.data.error === 40104) {
    //     res.data.messages.forEach(e => {
    //       modalManager(e, "error", app);
    //     });
    //   }
    //   if (res.data.error === 40105) {
    //     res.data.messages.forEach(e => {
    //       modalManager(e, "error", app);
    //     });
    //   }
    //   if (res.data.error === 40106) {
    //     res.data.messages.forEach(e => {
    //       modalManager(e, "error", app);
    //     });
    //   }
    //   if (res.data.error === 40107) {
    //     res.data.messages.forEach(e => {
    //       modalManager(e, "error", app);
    //     });
    //   }
    //   if (res.data.error === 40108) {
    //     res.data.messages.forEach(e => {
    //       modalManager(e, "error", app);
    //     });
    //   }
    //   if (res.data.error === 40109) {
    //     res.data.messages.forEach(e => {
    //       modalManager(e, "error", app);
    //     });
    //   }
    //
    //   if (res.data.error === 40301) {
    //     res.data.messages.forEach(e => {
    //       modalManager(e, "error", app);
    //     });
    //   }
    //
    //   if (res.data.error === 40401) {
    //     res.data.messages.forEach(e => {
    //       modalManager(e, "error", app);
    //     });
    //   }
    //
    //   if (res.data.error === 40603) {
    //     res.data.messages.forEach(e => {
    //       modalManager(e, "error", app);
    //     });
    //   }
    // }
  });


  // $axios.onResponseError(err => {
  //     console.log('here is err in axios plugin', err.response);
  //   if (err.response.status === 422) {
  //     modalManager(err.response.data.message, "error", app);
  //   }
  //   if (err.response.status === 400) {
  //     modalManager(err.response.data.message, "error", app);
  //   }
  //   if (err.response.status === 404) {
  //     modalManager(err.response.data.message, "error", app);
  //   }
  //   if (err.response.status === 403) {
  //     modalManager(err.response.data.message, "error", app);
  //     redirect("/");
  //   }
  //   if (err.response.status === 401) {
  //     modalManager(err.response.data.message, "error", app);
  //     redirect("/");
  //   }
  //   if (err.response.status === 500) {
  //     modalManager(err.response.data.message, "error", app);
  //   }
  // });

  // Inject to context as $api
  //   inject('api', api)
}
// function modalManager(text, type, app) {
//   // console.log(app);
//   app.$toast.show(text, {
//     type: type,
//     position: "top-right",
//     duration: 2000,
//     keepOnHover: true,
//     theme: "bubble"
//   });
// }
