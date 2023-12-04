import { access, constants, mkdir, unlink, writeFile } from "fs/promises";
import { join } from "path";
import { v4 } from "uuid";

const imagesFolder = join("public", "tmp");

export const saveImageLocally = async (image: File) => {
  const bytes = await image.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const avatarName = v4() + "__" + image.name;
  const path = join(imagesFolder, avatarName);

  try {
    await access(imagesFolder, constants.F_OK);
  } catch (e) {
    await mkdir(imagesFolder);
  }

  await writeFile(path, buffer);

  return avatarName;
};

export const removeImageLocally = async (imageName: string) => {
  try {
    const prevImg = join(imagesFolder, imageName);
    await access(prevImg);
    await unlink(prevImg);
  } catch (e) {}
};
