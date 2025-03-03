# ngex-table

The Angular `ngex-table` library package is published on the [npm](https://www.npmjs.com/package/ngex-table). The library works for applications with the Angular version 19 and standalone.


## Installation

Run `npm install ngex-table` to add the library into your project directory,, or add `"ngex-table": "^19.0.2"` to the package.json file and then run `npm install` to update the existing file.

## Details and Use Cases

To see how to use the grid tool in details, please view the articles [Client and Server-Side Data Filtering, Sorting, and Pagination with Angular NgExTable](https://www.codeproject.com/Articles/1228928/Client-and-Server-Side-Data-Filtering-Sorting-and) and [Multiple Column Sorting: from Angular NgExTable to Source Data List Management](https://www.codeproject.com/Articles/5166021/Multiple-Column-Sorting-from-Angular-NgExTable-to). Those articles are read-only and cannot be updated on the site. Although these articles were posted for lagacy Angular versions, the use cases and operations with the new version of the `ngex-table` are still kept the same.

## angular-sources_only

This folder contains the demo project that can be run in any platform with the regular Angular project setup.

## NgExTable_AspNetCore

It's the Visual Studio 2022 solution of the ASP.NET Core 9.0 website project containing the ngex-table demo. You need to do the `npm install` in the directory *NgExTable_AspNetCore/SM.NgExTable.Web/wwwroot/angular-content* for the *node_modules* and then run the `ng build --configuration {your environment}` before starting the website.
