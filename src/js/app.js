App={
    web3Provider: null,
    contracts: {},

    init: async function() {
        return await App.initWeb3();
    },

    initWeb3: async function(){
        if(window.web3){
            App.web3Provider=window.web3.currentProvider;
        } else {
            App.web3Provider=new Web3.providers.HttpProvider("http://127.0.0.1:7545");
        }

        web3=new Web3(App.web3Provider);
        return App.initContract();
    },

    initContract: function(){
        $.getJSON('demo.json',function(data){
            var msgArtifact=data;
            App.contracts.demo=TruffleContract(msgArtifact);
            App.contracts.demo.setProvider(App.web3Provider);
            return App.displayMessage();
        })
            return App.bindEvents();
    },

    displayMessage: function(){
        // viewvotes
        var msgInstance;
        App.contracts.demo.deployed().then(function(instance){
            msgInstance=instance;
            return msgInstance.viewMessage.call();
        }).then(function(result){
            console.log(result);
            document.getElementById('msgpreview').innerHTML=result;
        }).catch(function(err){
            console.log(err.message);
        })
    },

    bindEvents: function() {
        // configure buttons
        $(document).on('click','.btn-submit',App.storeMessage);

    },

    storeMessage: function(event){
        // storeMessage
        event.preventDefault();

        var demoInstance;
        var msgValue=document.getElementById('msgValue').value;
        console.log(msgValue)
        web3.eth.getAccounts(function(err,accounts){
            if(err)
                console.log(err);
            var account=accounts[0];
            console.log(account);

            App.contracts.demo.deployed().then(function(instance){
                demoInstance=instance;
                return demoInstance.storeMessage(msgValue,{from:account});
            }).then(function(result){
                console.log(result);
                document.getElementById("add").innerHTML=account;
                return App.displayMessage();
            }).catch(function(err){
                console.log(err,err.message);
            })
        })
        document.getElementById('msgValue').value="";


    }
}

$(function(){
    $(window).load(function(){
        App.init();
    })
})