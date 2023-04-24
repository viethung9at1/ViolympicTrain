using Microsoft.AspNetCore.Mvc;
namespace ViolympicTest;
[ApiController]
public class NumberChooseController : ControllerBase
{
    private Random rd = new Random();
    private int getNumber()
    {
        return rd.Next(1, 1000);
    }
    private int getNumber(int min, int max)
    {
        if (min > max)
            return 1;
        return rd.Next(min, max);
    }
    private char? getOp()
    {
        byte choice = Convert.ToByte(rd.Next(0, 3));
        switch (choice)
        {
            case 0: return '+';
            case 1: return '-';
            case 2: return '*';
            case 3: return '/';
            default: return null;
        }
    }
    [Route("[controller]/inc/{numOfButton}")]
    [HttpGet]
    public IActionResult GetInc(int numOfButton)
    {
        double sqrtAns = Math.Sqrt(numOfButton);
        if (Math.Floor(sqrtAns) != sqrtAns) return BadRequest();
        int[] dataAsInt = new int[numOfButton];
        Random rd = new Random();
        for (int i = 0; i < dataAsInt.Length; i++)
        {
            int num = getNumber();
            while (dataAsInt.Contains(num))
            {
                num = getNumber();
            }
            dataAsInt[i] = num;
        }
        int[] rankedArray = new int[numOfButton];
        dataAsInt.CopyTo(rankedArray, 0);
        Array.Sort(rankedArray);
        NumberChoose[] numChooseArr = Enumerable.Range(0, numOfButton).Select(index => new NumberChoose
        {
            Id = index,
            Text = dataAsInt[index].ToString(),
            OrdinaryToChoose = Array.FindIndex(rankedArray, x => x == dataAsInt[index]) + 1,
            Value = dataAsInt[index]
        }).ToArray();
        return Ok(numChooseArr);
    }
    [Route("[controller]/same/{numOfButton}")]
    [HttpGet]
    public IActionResult getSame(int numOfButton)
    {
        if (numOfButton % 2 != 0) return Unauthorized();
        bool[] used = new bool[numOfButton];
        int[] value = new int[numOfButton];
        int num1 = 0, num2 = 0;
        string[] strValue = new string[numOfButton];
        NumberChoose[] numberChooseArr=new NumberChoose[numOfButton];
        for (int i = 0; i < numOfButton / 2; i++)
        {
            int res = getNumber();
            char? op = getOp();
            switch (op)
            {
                case '+':
                    num1 = getNumber(1, res);
                    num2 = res - num1;
                    break;
                case '-':
                    num1 = getNumber(res, 10000);
                    num2 = num1 - res;
                    break;
                case '*':
                    num1 = getNumber(1, res);
                    while (res % num1 != 0) num1 = getNumber(1, res);
                    num2 = res / num1;
                    break;
                case '/':
                    num1 = getNumber(res, 10000);
                    while (num1 % res != 0) num1 = getNumber(res, 10000);
                    num2=num1/res;
                    break;
            }
            value[i]=res;
            strValue[i]=num1.ToString()+' '+op+' '+num2.ToString();
            numberChooseArr[i]=new NumberChoose(){
              Text=strValue[i],
              Value=value[i]  
            };
        }
        for (int i = 0; i < numOfButton / 2; i++)
        {
            int index=i+numOfButton/2;
            int res =value[i];
            char? op = getOp();
            switch (op)
            {
                case '+':
                    num1 = getNumber(1, res);
                    num2 = res - num1;
                    break;
                case '-':
                    num1 = getNumber(res, 10000);
                    num2 = num1 - res;
                    break;
                case '*':
                    num1 = getNumber(1, res);
                    while (res % num1 != 0) num1 = getNumber(1, res);
                    num2 = res / num1;
                    break;
                case '/':
                    num1 = getNumber(res, 10000);
                    while (num1 % res != 0) num1 = getNumber(res, 10000);
                    num2=num1/res;
                    break;
            }
            value[index]=res;
            strValue[index]=num1.ToString()+' '+op+' '+num2.ToString();
            numberChooseArr[index]=new NumberChoose(){
              Text=strValue[index],
              Value=value[index]  
            };
        }   
        var randomBtnArr=numberChooseArr.OrderBy(item => rd.Next()).ToArray();
        for(int i=0;i<randomBtnArr.Length;i++){
            randomBtnArr[i].Id=i;
        }
        return Ok(randomBtnArr);
    }
}