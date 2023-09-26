import { Hono } from "hono";
import { it, expect } from "vitest";

it("should return File", async () => {
  const app = new Hono();

  app.post("/", async (c) => {
    const formData = await c.req.parseBody();
    const file = formData["file"];

    if (file instanceof File) {
      return c.text("File!");
    }
    return c.text("Not File!");
  });

  const formData = new FormData();
  const file = new File(["Hello Hono Storage 1\n"], "sample1.txt");
  formData.append("file", file);

  const res = await app.request("http://localhost/", {
    method: "POST",
    body: formData,
  });

  expect(await res.text()).toBe("File!");
});
