const path=require('path')
const allure = require('allure-commandline')
const video = require('wdio-video-reporter');

exports.config = {
    ///port: 4723,
    ///path: '/wd/hub',
    user: "rodrigocanova_vADB85",
    key: "HoRxppyiKMwGpkgQCFcL",

    ///services: ['appium'],
    services: ['browserstack'],
    specs: [
        './teste/specs/**/*.spec.js'
    ],
    framework: 'mocha',
    capabilities:[{
        "platformName": "Android",
        ///"platformVersion": "11.0",
        ///"deviceName": "Pixel 4 API 30",
        ///"automationName": "UiAutomator2",
        ///"app": path.join(process.cwd(), "./app/android/teste.apk"),
        ///"appWaitActivity": "com.woocommerce.android.ui.login.LoginActivity"

        'app' : 'bs://081d07fe38723959763738a305e608d534eea870',
        // Specify device and os_version for testing
        'device' : 'Samsung Galaxy S20',
        'os_version' : '10.0',
        // Set other BrowserStack capabilities
        'project' : 'Primeiro Device Farm',
        'build' : '1',
        'name': 'teste_login'

    }],
    waitForTimeout: 20000,
    mochaOpts: {
        timeout: 300000
    },
    reporters: ['spec',
    ['allure', {
        outputDir: 'allure-results',
        disableWebdriverStepsReporting: true,
        disableWebdriverScreenshotsReporting: true,
    }],
    [video, {
        saveAllVideos: true,       // If true, also saves videos for successful test cases
        videoSlowdownMultiplier: 50, // Higher to get slower videos, lower for faster videos [Value 1-100]
      }],
    ],
    onComplete: function() {
        const reportError = new Error('Could not generate Allure report')
        const generation = allure(['generate', 'allure-results', '--clean'])
        return new Promise((resolve, reject) => {
            const generationTimeout = setTimeout(
                () => reject(reportError),
                5000)

            generation.on('exit', function(exitCode) {
                clearTimeout(generationTimeout)

                if (exitCode !== 0) {
                    return reject(reportError)
                }

                console.log('Allure report successfully generated')
                resolve()
            })
        })
    },
    afterStep: function (step, scenario, { error, duration, passed }, context) {
        
          driver.takeScreenshot();
        
      },
}