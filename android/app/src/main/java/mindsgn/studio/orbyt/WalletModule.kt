package mindsgn.studio.orbyt
import com.facebook.react.bridge.Callback
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import org.bitcoinj.core.VersionMessage;
import org.bitcoinj.crypto.MnemonicCode;
import org.bitcoinj.utils.ContextPropagatingThreadFactory;
import org.bitcoinj.utils.Threading;
import org.bitcoinj.wallet.UnreadableWalletException;
import org.bitcoinj.wallet.Wallet;
import org.bitcoinj.wallet.WalletFiles;
import org.bitcoinj.wallet.WalletProtobufSerializer;

class WalletModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext){
    // private val bitcoinKit: AbstractKit
    override fun getName() = "WalletModule"

    @ReactMethod fun createBitcoinWallet(walletAddress: String, callback: Callback) {
        callback.invoke(null, walletAddress)
    }
}