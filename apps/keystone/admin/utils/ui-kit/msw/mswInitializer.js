if (typeof window === "object") {
  import("./browser").then(({ worker }) => {
    worker.start();
  });
}
