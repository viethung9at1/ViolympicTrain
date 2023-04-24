using Microsoft.AspNetCore.Mvc;
namespace ViolympicTest;
[ApiController]
public class CalculateController : Controller
{
    private Random rd = new Random();
    private int getNumber()
    {
        return rd.Next(0, 100);
    }
    private int getNumber(int min, int max)
    {
        if (min > max) return 1;
        return rd.Next(min, max);
    }
    private char? getOp()
    {
        int op = rd.Next(0, 4);
        switch (op)
        {
            case 0: return '+';
            case 1: return '-';
            case 2: return '*';
            case 3: return '/';
            default: return null;
        }
    }
    private (int?, int?) GenerateNumber(char op, int res)
    {
        int num1, num2;
        try{
        switch (op)
        {
            case '+':
                num1 = getNumber(0, res);
                num2 = res - num1;
                return (num1, num2);
            case '-':
                num1 = getNumber(res, 1000);
                num2 = num1 - res;
                return (num1, num2);
            case '*':
                num1 = getNumber(0, res);
                if (res == 0) num2 = 0;
                else num2 = res / num1;
                if (res % num1 != 0) return (num1, null);
                else return (num1, num2);
            case '/':
                if (res == 0) return (null, null);
                num1 = getNumber(res, 1000);
                num2 = num1 / res;
                if (num1 % res != 0) return (num1, null);
                else return (num1, num2);
            default: return (null, null);
        }
        }catch(Exception e){
            return (null, null);
        }

    }
    [Route("[controller]")]
    [HttpGet]
    public IActionResult Get()
    {
        int res = getNumber();
        int? num1 = null, num2 = null;
        char? op = null;
        while (num1 == null || num2 == null)
        {
            op = getOp();
            (num1, num2) = GenerateNumber((char)op, res);
        }
        Calculate calculate = new()
        {
            Num1 = (int)num1,
            Num2 = (int)num2,
            Operator = (char)op,
            Value = (int)res
        };
        return Ok(calculate);
    }
}
