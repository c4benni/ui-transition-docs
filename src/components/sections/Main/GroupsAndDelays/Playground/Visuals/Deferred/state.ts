import { ref } from "vue";

export type SplashImage = {
  owner: string;
  src: string;
  id: string;
};

const image = (owner: string) => ({
  owner,
  src: `GroupsAndDelays/${owner.replace(/\s/g, "%20")}.jpg`,
});

export const splashImages: SplashImage[] = [
  image("Donald Giannatti"),
  image("Robby Mccullough"),
  image("Casey Horner"),
  image("Michael D"),
  image("Andrzej Suwara"),
  image("Mike Bowman"),
].map((x, i) => ({ ...x, id: `image-${i}` }));

export const selected = ref<number | null>(null);
