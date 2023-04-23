using Microsoft.AspNetCore.Mvc;
namespace ViolympicTest;
[ApiController]
public class NumberChooseController:ControllerBase{
    [Route("[controller]/inc/{numOfButton}")]
    [HttpGet]
    public IEnumerable<NumberChoose> GetInc(int numOfButton){
        int [] dataAsInt=new int [numOfButton];
        Random rd=new Random();
        for(int i=0;i<dataAsInt.Length;i++){
            int num=rd.Next(0,1000);
            while(dataAsInt.Contains(num)){
                num=rd.Next(0,1000);
            }
            dataAsInt[i]=num;
        }
        int [] rankedArray=new int[numOfButton];
        dataAsInt.CopyTo(rankedArray, 0);
        Array.Sort(rankedArray);
        NumberChoose [] numChooseArr=Enumerable.Range(0,numOfButton).Select(index => new NumberChoose{
            Id=index,
            Text=dataAsInt[index].ToString(),
            OrdinaryToChoose=Array.FindIndex(rankedArray, x=> x==dataAsInt[index])+1
        }).ToArray();
        return numChooseArr;
    }
    
}