export function test(error, res) {
  if (error) {
    return error;
  } else {
    return res;
  }
}
export function test1(http, ...rest) {
  return http({ url: '/tuns-user/cmmSysConfig/getLoginPwdRulesSecurity' }).catch((err) => {
    console.log(err);
  });
}
