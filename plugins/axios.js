export default function({ $axios, redirect }) {
  $axios.setBaseURL("http://localhost:8081");

  $axios.onRequest(config => {
    // console.log(config);
    // console.log("Making request to " + config.url);
  });

  $axios.onResponse(config => {});

  $axios.onError(error => {});
}
