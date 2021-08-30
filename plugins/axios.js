
export default function({ $axios}) {

  $axios.onRequest((config) => {
    console.log('here is on request in axios plugin' , config.headers)
      
  })
  $axios.onResponse(res => {
      console.log('here is res in axios plugin', res);
  });
}
