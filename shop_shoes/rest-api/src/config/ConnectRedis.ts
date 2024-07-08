import { RedisClientType } from "@redis/client";
import { createClient } from "redis";

class Redis {
  public redis!: RedisClientType;
  async initial() {
    try {
      this.redis = createClient();
      await this.redis.connect();
    } catch (error) {
      console.log("error connecting to redis server:: ", error);
    }
  }
  async get(key: string): Promise<string | null> {
    const value = await this.redis.get(key);
    return value;
  }
  async set(key: string, value: string) {
    await this.redis.set(key, value);
  }
  async setEx(key: string, value: string) {
    await this.redis.set(key, value);
  }
}

export const redis = new Redis();
