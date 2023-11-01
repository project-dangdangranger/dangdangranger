package com.idog.dangdangranger

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class KakaoMapModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "KakaoMapModule"
    }

    @ReactMethod
    fun showHelloWorld() {
        println("Hello World!")
    }
}
