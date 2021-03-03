var dog, dogImg, dogImg1,database,foodS,foodStock, fedTime, lastFed, foodObj
function preload()
{
	dogImg=loadImage("images/dogImg.png")
  dogImg1=loadImage("images/dogImg1.png")
}

function setup() {
  database=firebase.database();
	createCanvas(1000, 500);

  foodObj= new Food();
  dog=createSprite(250,300);
  dog.addImage(dogImg)
  dog.scale=0.16

  foodStock=database.ref('Food')
  foodStock.on("value",readStock)

  feed=createButton("Feed the Dog");
  feed.position(700,95)
  feed.mousePressed(feedDog)
  
  addFood=createButton("add food");
  addFood.position(800,95)
  addFood.mousePressed(addFoodS)
  
}


function draw() {  
background(46,139,87)

foodObj.display();

fedTime=database.ref('FeedTime'); 
fedTime.on("value",function(data){ 
  lastFed=data.val(); 
});

fill(255,255,254);
 textSize(15); 
 if(lastFed>=12){ 
   text("Last Feed : "+ lastFed%12 + " PM", 350,30);
   }
   else if(lastFed==0){ 
     text("Last Feed : 12 AM",350,30); 
    }
    else{ 
      text("Last Feed : "+ lastFed + " AM", 350,30); 
    } 
      drawSprites();
     }

 


function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS)

}
function feedDog(){ 
  dog.addImage(dogImg1); 
  if(foodObj.getFoodStock()<= 0){ 
    foodObj.updateFoodStock(foodObj.getFoodStock()*0);
   }
   else{ 
     foodObj.updateFoodStock(foodObj.getFoodStock()-1);
     } 
     database.ref('/').update( { 
         Food:foodObj.getFoodStock(), 
         FeedTime:hour() 
        }) 
      } 
      //function to add food in stock 
      function addFoodS(){
        foodS++;
         database.ref('/').update({ 
           Food:foodS
           })
       }



