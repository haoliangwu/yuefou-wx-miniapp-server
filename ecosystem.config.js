require('dotenv').config({ path: './.env' })

module.exports = {

    /**
 * Application configuration section
 * http://pm2.keymetrics.io/docs/usage/application-declaration/
 */

    apps: [
        {
            'name': 'yuefou-wx-miniapp-server',
            'script': 'app.js',
            'cwd': './',
            'exec_mode': 'fork',
            'watch': true,
            'ignore_watch': ['tmp', 'node_modules'],
            'env': {
                'NODE_ENV': 'development'
            },
            'engines': {
                'node': '>=7.6'
            }
        }
    ],
    deploy: {
    // TODO 等正式环境在配置
        'production': {

        },
        'staging': {
            'key': '~/.ssh/id_rsa',
            'user': 'ubuntu',
            'host': '58.87.91.173',
            'ref': 'origin/staging',
            'repo': 'git@github.com:haoliangwu/yuefou-wx-miniapp-server.git',
            'path': '/home/ubuntu/yuefou-wx-miniapp-server',
            'ssh_options': ['StrictHostKeyChecking=no', 'PasswordAuthentication=no'],
            'post-deploy': 'yarn install && yarn start',
            'env': {
                'NODE_ENV': 'staging'
            }
        }
    }
}
