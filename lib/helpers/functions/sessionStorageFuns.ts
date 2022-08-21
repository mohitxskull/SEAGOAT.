const SessionStorage = {
  Set: (KEY: string, VALUE: any) => {
    sessionStorage.setItem(KEY, JSON.stringify(VALUE));
  },

  Get: (KEY: string) => {
    const Response = sessionStorage.getItem(KEY);
    if (Response) {
      return JSON.parse(Response);
    }
    return null;
  },
};

export default SessionStorage;
