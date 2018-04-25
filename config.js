const CONF = {
    port: '5757',
    rootPathname: '',

    // 微信小程序 App ID
    appId: process.env.MINI_APP_ID,

    // 微信小程序 App Secret
    appSecret: process.env.MINI_APP_SECRET,

    // 是否使用腾讯云代理登录小程序
    useQcloudLogin: true,

    /**
   * MySQL 配置，用来存储 session 和用户信息
   * 若使用了腾讯云微信小程序解决方案
   * 开发环境下，MySQL 的初始密码为您的微信小程序 appid
   */
    mysql: {
        host: 'localhost',
        port: 3306,
        char: 'utf8mb4',
        user: process.env.WAFER_DB_USER,
        db: process.env.WAFER_DB_DB,
        pass: process.env.WAFER_DB_PASS
    },

    cos: {
    /**
     * 地区简称
     * @查看 https://cloud.tencent.com/document/product/436/6224
     */
        region: 'ap-beijing',
        // Bucket 名称
        fileBucket: 'yuefou-cos',
        // 文件夹
        uploadFolder: '/shared/recipes'
    },

    // 微信登录态有效期
    wxLoginExpires: 7200,

    // 其他配置 ...
    serverHost: 'littlelyon.com',
    tunnelServerUrl: process.env.TUNNEL_URL,
    tunnelSignatureKey: process.env.TUNNEL_SIGN_KEY,
    // 腾讯云相关配置可以查看云 API 秘钥控制台：https://console.cloud.tencent.com/capi
    qcloudAppId: process.env.COS_APP_ID,
    qcloudSecretId: process.env.COS_SECRET_ID,
    qcloudSecretKey: process.env.COS_SECRET_KEY,
    wxMessageToken: 'abcdefgh',
    networkTimeout: 30000
}

module.exports = CONF
