import bcrypt from "bcrypt";

export function hashPasswordAsync(password: string, saltRounds: number) {
  return new Promise<string>((resolvePromise, rejectPromise) => {
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) {
        //something went wrong so reject the promise
        return rejectPromise(err);
      }

      // it went well, so return the hash to the caller via promise
      resolvePromise(hash);
    });
  });
}
