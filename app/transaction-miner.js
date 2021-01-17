const Transaction = require("../wallet/transaction")


class TransactionMiner{
    
    blockchain
    transactionPool
    wallet
    pubsub
    constructor({ blockchain, transactionPool, wallet, pubsub }){
        this.blockchain = blockchain
        this.transactionPool = transactionPool
        this.wallet = wallet
        this.pubsub = pubsub

    }
    
    mineTransactions(){
        const validTransactions = this.transactionPool.validTransactions()

        // generate the miner's reward
        validTransactions.push(
            Transaction.rewardTransaction({ minerWallet: this.wallet })
        )
        

        // add a block consisting of these transactions to the blockchain
        this.blockchain.addBlock({ data: validTransactions })

        // broadcast teh updated blockchain
        this.pubsub.broadcastChain()

        // clear the pool
        this.transactionPool.clear()
    }
}

module.exports = TransactionMiner