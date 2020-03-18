class DailySummary {
   constructor(theMap, date, summaryContent) {
       this.photos = [];
       this.theMap = theMap;
       this.currentDate = date;
       this.summaryContent = summaryContent;
   }
   
   addPhoto(photo) {
       this.photos.push(photo);
   }

   removePhoto(photo) {
       this.photos = this.photos.filter(item => {
           return item !== photo;
       })
   }

   set theMap(newMap) {
       this.theMap = newMap;
   }
}

export default DailySummary;