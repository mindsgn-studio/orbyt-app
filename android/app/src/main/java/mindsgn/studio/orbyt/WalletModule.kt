package mindsgn.studio.orbyt
import com.facebook.react.bridge.Callback
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class WalletModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext){
    override fun getName() = "WalletModule"

    @ReactMethod fun createBitcoinWallet(walletAddress: String, callback: Callback) {
        callback.invoke(null, walletAddress)
    }
}