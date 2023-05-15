FROM denoland/deno

EXPOSE 8000

WORKDIR /app

ADD . /app

RUN  deno cache src/app.ts

CMD ["run", "--allow-net", "--allow-env", "--allow-sys", "--allow-read", "--allow-write", "src/app.ts"]