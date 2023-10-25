export function generateApis(http) {
  const global = {}
  const files = require.context('@/apis', false, /\.js$/)
  const apis = files.keys()
  for (const filePath of apis) {
      const fileName = filePath.split('/')[1].split('.')[0]
      if (!fileName.endsWith('Api')) {
          console.error(key + '的文件名称需要以Api结尾')
          continue;
      } else {
          const serviceScope = '$'+fileName
          global[serviceScope] = {};
          const originApi = require(`@/apis/${fileName}.js`)
          const originApiKeys = Object.keys(originApi)
          originApiKeys.forEach((fnName) => {
            global[serviceScope][fnName] = async function (...rest) {
                const [{delegate=true,...other},...otherParam] = rest
                if (delegate) {
                  let error = null;
                  const res = await http.request(other).catch(err => {
                    error = err
                  });
                  return originApi[fnName](error, res);
                } else {
                  return originApi[fnName](http.request.bind(http), other, otherParam);
                }
              };
          });
      }
  }
  return global
}
