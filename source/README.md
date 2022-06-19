**Application Hosted Azure Link : https://eeg-plotter.azurewebsites.net**

**Login Creds : **

a.Technician --- Username : Abishek , Password : abishek
b.Doctor     --- Username : Karthik , Passsword : karthik

**Folder Structure : **

1.**EEGTelemetryAPI** - This folder contains the .Net Core API application which contains all the API related logics.This application is hosted in Azure WebAPP (https://eegtelemetry.azurewebsites.net/swagger/index.html).The API details and parameters can be viewed from this hosted swagger UI. 
                       
                    To open this application download and install dotnet(https://dotnet.microsoft.com/en-us/download)
                    
2.**EEGTElemetrySPA** - This folder contains the Angular application which consists of the login page,dashboard page,create report,report diagnosis and report pdf downloader.The uploaded files will be saved in Azure Storage (example file stored in Azure Storage : https://eegfilesstorage.blob.core.windows.net/eegfiles/eeg.csv)

3.**EEG-Plotter** -      This folder contains the eeg-plotter screen in which the eeg files can be opened and diagnosed by the doctor.This is just a demo eegviewer screen that is built on Angular Framework.The actual EEGViewer will require 4-6 months of development and will be developed using MatLab or Python since it requires lot of signal processing algorithms and ML/AI algorithms for performing various functionalities such as noise removal,artifact reduction and filtering on the eeg signals.(EEG-plotter Hoster Url : https://eeg-plotter.azurewebsites.net/) 
                      EEGPlotter is hosted as a separate application because in future the Signal Processing will consume more load on the server so this application would require a higher end computing server engine.

**SQL Database ** -- 
                    The report details are stored in SQL Database.It consists of two tables 
                    1.Admin - To store the admin details
                    2.Reports - To store the report details
                    
**Azure Storage** --  Azure Storage is being used to store the eeg-data files that are being uploaded by the technician during the creation of the report.

**Steps to run Angular application in local :**
     (Install Node before configuring the application.Node can be downloaded from :https://nodejs.org/en/download/)
     1.Install Angular CLI - npm install -g @angular/cli
     2.Install npm package - npm install
     3.Build the application - npm run build
     4.Run the application - ng serve
     

Sample EEG file has also been uploaded in this folder for testing purporse.
