import { Component } from '@angular/core';
import { NavController, ToastController, LoadingController, Loading, ActionSheetController, Platform } from 'ionic-angular';
import { Subscription} from 'rxjs/Subscription';
import { Network } from '@ionic-native/network';
import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { FileTransfer } from '@ionic-native/file-transfer';
import { LoginPage } from '../login/login';
declare var cordova: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	connected: Subscription;
  	disconnected: Subscription;
  	//image file transfer requirements
  	photos = [];
  	lastImage: string = null;
  	currentimageurl: string = null;
  	loading: Loading;
  	imageURI:any;
	imageFileName:any;

  constructor(public navCtrl: NavController,
  				private network: Network, 
  				private toastCtrl: ToastController,
  				private camera: Camera,
  				private transfer: FileTransfer,
  				//private transferObject: FileTransferObject, 
  				private file: File,
  				public actionSheetCtrl: ActionSheetController, 
  				public platform: Platform, 
  				public loadingCtrl: LoadingController) {


  	this.platform.ready().then(() => {     

          if (!localStorage.getItem('userData')) {
          	this.navCtrl.push(LoginPage);
          }
    });

  }

  ionViewDidEnter() {
	  this.connected = this.network.onConnect().subscribe(data => {
	    let networkType = this.network.type;
	    this.presentToast('You are now ' + data.type + ' via ' + networkType, 'bottom', 'io-toast-green');

	  }, error => console.error(error));
	 
	  this.disconnected = this.network.onDisconnect().subscribe(data => {
	    let networkType = this.network.type;
	  	this.presentToast('You are now ' + data.type + ' via ' + networkType, 'bottom', 'io-toast-red');
	  }, error => console.error(error));
	}

	ionViewWillLeave(){
	  this.connected.unsubscribe();
	  this.disconnected.unsubscribe();
	}

	private presentToast(text, pozitie, clasa) {
  		let toast = this.toastCtrl.create({
		    message: text,
		    duration: 4000,
		    position: pozitie,
		    cssClass: clasa,
		    showCloseButton: true,
		    closeButtonText: 'Done'
  		});
  		toast.present();
	}

	/*
	*
	* PICTURE TAKING - camera or local library
	*
	*/
	public presentActionSheet() {
    	let actionSheet = this.actionSheetCtrl.create({
	      	title: 'Select Image Source',
	      	buttons: [
	        	{
			    	text: 'Load from Library',
			    	handler: () => {
			    		this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
	      			}
		        },
		        {
		          	text: 'Use Camera',
		          	handler: () => {
		            	this.takePicture(this.camera.PictureSourceType.CAMERA);
		          	}
		        },
		        {
		          	text: 'Cancel',
		          	role: 'cancel'
		        }
	      	]
    	});

    	actionSheet.present();
  	}
/* SA DESCHIDEM DACAS NU E LOCALSTORAGE ID user - cu push, la load!!!!!!
  	public openloginpage() {
  		this.navCtrl.push(LoginPage);
  	}
*/


  	public takePicture(sourceType) {
	  	// Create options for the Camera Dialog
	  	var options = {
		    quality: 50,
		    destinationType: this.camera.DestinationType.FILE_URI,
		    targetWidth: 1000,
		    targetHeight: 1000,
		    sourceType: sourceType,
		    saveToPhotoAlbum: true,
		    correctOrientation: true
	  	};
		 
	  	// Get the data of an image
	  	this.camera.getPicture(options).then((imagePath) => {
	  		//this.presentToast('imaginea: ' + imagePath, 'bottom', 'io-toast-green');
		    // Special handling for Android library
/*		    if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
	      		this.filePath.resolveNativePath(imagePath)
		        .then(filePath => {
	          		let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
	          		let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
	          		this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
		        })
		        .catch(err => this.presentToast('Error resolve native path.' + err, 'bottom', 'io-toast-red'));
		    } else {*/
		    	
	      		var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
	      		if (currentName.indexOf('?') > -1) {
	      			currentName = currentName.substr(0, currentName.lastIndexOf('?'))
	      		}
	      		var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
	      		this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
		    //}
	  	}, (err) => {
		    this.presentToast('Error while selecting image.', 'bottom', 'io-toast-red');
	  	});
	}


	// Create a new name for the image
	private createFileName() {
  		var d = new Date(),
  		n = d.getTime(),
  		newFileName =  n + ".jpg";
  		return newFileName;
	}
 
	// Copy the image to a local folder
	private copyFileToLocalDir(namePath, currentName, newFileName) {
  		this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
	    	this.lastImage = newFileName;
	    	//this.photos.push(newFileName);
	    	this.imageURI = namePath;
	    	this.imageFileName = this.pathForImage(this.lastImage);
	  	}, error => {
	    	this.presentToast('Error while storing file.', 'bottom', 'io-toast-red');
	  	});
	}
 
 
	// Always get the accurate path to your apps folder
	public pathForImage(img) {
  		if (img === null) {
	    	return '';
  		} else {
	    	return cordova.file.dataDirectory + img;
  		}
	}


	public uploadImage() {
  		// Destination URL
  		var url = "https://haircode.magicode.studio/imgupload.php";
 
  		// File for Upload
  		var targetPath = this.pathForImage(this.lastImage);
 
  		// File name only
  		var filename = this.lastImage;
 
	  	var options = {
		    fileKey: "file",
		    fileName: filename,
		    chunkedMode: false,
		    mimeType: "multipart/form-data",
		    params : {'fileName': filename}
	  	};
 
  		const fileTransfer = this.transfer.create();
 
  		this.loading = this.loadingCtrl.create({
    		content: 'Uploading...',
		});
  		this.loading.present();
 
  		// Use the FileTransfer to upload the image
  		fileTransfer.upload(targetPath, url, options).then(data => {
    		this.loading.dismissAll()
    		this.presentToast('Image succesful uploaded.', 'bottom', 'io-toast-green');
  		}, err => {
    		this.loading.dismissAll()
    		this.presentToast('Error while uploading file.', 'bottom', 'io-toast-red');
  		});
	}

    
    ngAfterViewInit() {
        
        console.log('hello')
        var x = new Date();
        var y = x.getHours();
        if (y < 12) {  
            document.getElementById('day').innerHTML = ' Morning';
        } else if (y < 18) {
            document.getElementById('day').innerHTML = ' Afternoon';
        } else {
            document.getElementById('day').innerHTML = ' Evening';
        }
    }

}


