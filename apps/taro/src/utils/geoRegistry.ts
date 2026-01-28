// src/utils/geoRegistry.ts

import worldChina from '../data/world/china.json';
import worldJapan from '../data/world/japan.json';
import worldUsa from '../data/world/usa.json';
import china from '../data/china/china.json';
import c1101 from '../data/china/geometryCouties/1101.json';
import c1201 from '../data/china/geometryCouties/1201.json';
import c1301 from '../data/china/geometryCouties/1301.json';
import c1302 from '../data/china/geometryCouties/1302.json';
import c1303 from '../data/china/geometryCouties/1303.json';
import c1304 from '../data/china/geometryCouties/1304.json';
import c1305 from '../data/china/geometryCouties/1305.json';
import c1306 from '../data/china/geometryCouties/1306.json';
import c1307 from '../data/china/geometryCouties/1307.json';
import c1308 from '../data/china/geometryCouties/1308.json';
import c1309 from '../data/china/geometryCouties/1309.json';
import c1310 from '../data/china/geometryCouties/1310.json';
import c1311 from '../data/china/geometryCouties/1311.json';
import c1401 from '../data/china/geometryCouties/1401.json';
import c1402 from '../data/china/geometryCouties/1402.json';
import c1403 from '../data/china/geometryCouties/1403.json';
import c1404 from '../data/china/geometryCouties/1404.json';
import c1405 from '../data/china/geometryCouties/1405.json';
import c1406 from '../data/china/geometryCouties/1406.json';
import c1407 from '../data/china/geometryCouties/1407.json';
import c1408 from '../data/china/geometryCouties/1408.json';
import c1409 from '../data/china/geometryCouties/1409.json';
import c1410 from '../data/china/geometryCouties/1410.json';
import c1411 from '../data/china/geometryCouties/1411.json';
import c1501 from '../data/china/geometryCouties/1501.json';
import c1502 from '../data/china/geometryCouties/1502.json';
import c1503 from '../data/china/geometryCouties/1503.json';
import c1504 from '../data/china/geometryCouties/1504.json';
import c1505 from '../data/china/geometryCouties/1505.json';
import c1506 from '../data/china/geometryCouties/1506.json';
import c1507 from '../data/china/geometryCouties/1507.json';
import c1508 from '../data/china/geometryCouties/1508.json';
import c1509 from '../data/china/geometryCouties/1509.json';
import c1522 from '../data/china/geometryCouties/1522.json';
import c1525 from '../data/china/geometryCouties/1525.json';
import c1529 from '../data/china/geometryCouties/1529.json';
import c2101 from '../data/china/geometryCouties/2101.json';
import c2102 from '../data/china/geometryCouties/2102.json';
import c2103 from '../data/china/geometryCouties/2103.json';
import c2104 from '../data/china/geometryCouties/2104.json';
import c2105 from '../data/china/geometryCouties/2105.json';
import c2106 from '../data/china/geometryCouties/2106.json';
import c2107 from '../data/china/geometryCouties/2107.json';
import c2108 from '../data/china/geometryCouties/2108.json';
import c2109 from '../data/china/geometryCouties/2109.json';
import c2110 from '../data/china/geometryCouties/2110.json';
import c2111 from '../data/china/geometryCouties/2111.json';
import c2112 from '../data/china/geometryCouties/2112.json';
import c2113 from '../data/china/geometryCouties/2113.json';
import c2114 from '../data/china/geometryCouties/2114.json';
import c2201 from '../data/china/geometryCouties/2201.json';
import c2202 from '../data/china/geometryCouties/2202.json';
import c2203 from '../data/china/geometryCouties/2203.json';
import c2204 from '../data/china/geometryCouties/2204.json';
import c2205 from '../data/china/geometryCouties/2205.json';
import c2206 from '../data/china/geometryCouties/2206.json';
import c2207 from '../data/china/geometryCouties/2207.json';
import c2208 from '../data/china/geometryCouties/2208.json';
import c2224 from '../data/china/geometryCouties/2224.json';
import c2301 from '../data/china/geometryCouties/2301.json';
import c2302 from '../data/china/geometryCouties/2302.json';
import c2303 from '../data/china/geometryCouties/2303.json';
import c2304 from '../data/china/geometryCouties/2304.json';
import c2305 from '../data/china/geometryCouties/2305.json';
import c2306 from '../data/china/geometryCouties/2306.json';
import c2307 from '../data/china/geometryCouties/2307.json';
import c2308 from '../data/china/geometryCouties/2308.json';
import c2309 from '../data/china/geometryCouties/2309.json';
import c2310 from '../data/china/geometryCouties/2310.json';
import c2311 from '../data/china/geometryCouties/2311.json';
import c2312 from '../data/china/geometryCouties/2312.json';
import c2327 from '../data/china/geometryCouties/2327.json';
import c3101 from '../data/china/geometryCouties/3101.json';
import c3102 from '../data/china/geometryCouties/3102.json';
import c3201 from '../data/china/geometryCouties/3201.json';
import c3202 from '../data/china/geometryCouties/3202.json';
import c3203 from '../data/china/geometryCouties/3203.json';
import c3204 from '../data/china/geometryCouties/3204.json';
import c3205 from '../data/china/geometryCouties/3205.json';
import c3206 from '../data/china/geometryCouties/3206.json';
import c3207 from '../data/china/geometryCouties/3207.json';
import c3208 from '../data/china/geometryCouties/3208.json';
import c3209 from '../data/china/geometryCouties/3209.json';
import c3210 from '../data/china/geometryCouties/3210.json';
import c3211 from '../data/china/geometryCouties/3211.json';
import c3212 from '../data/china/geometryCouties/3212.json';
import c3213 from '../data/china/geometryCouties/3213.json';
import c3301 from '../data/china/geometryCouties/3301.json';
import c3302 from '../data/china/geometryCouties/3302.json';
import c3303 from '../data/china/geometryCouties/3303.json';
import c3304 from '../data/china/geometryCouties/3304.json';
import c3305 from '../data/china/geometryCouties/3305.json';
import c3306 from '../data/china/geometryCouties/3306.json';
import c3307 from '../data/china/geometryCouties/3307.json';
import c3308 from '../data/china/geometryCouties/3308.json';
import c3309 from '../data/china/geometryCouties/3309.json';
import c3310 from '../data/china/geometryCouties/3310.json';
import c3311 from '../data/china/geometryCouties/3311.json';
import c3401 from '../data/china/geometryCouties/3401.json';
import c3402 from '../data/china/geometryCouties/3402.json';
import c3403 from '../data/china/geometryCouties/3403.json';
import c3404 from '../data/china/geometryCouties/3404.json';
import c3405 from '../data/china/geometryCouties/3405.json';
import c3406 from '../data/china/geometryCouties/3406.json';
import c3407 from '../data/china/geometryCouties/3407.json';
import c3408 from '../data/china/geometryCouties/3408.json';
import c3410 from '../data/china/geometryCouties/3410.json';
import c3411 from '../data/china/geometryCouties/3411.json';
import c3412 from '../data/china/geometryCouties/3412.json';
import c3413 from '../data/china/geometryCouties/3413.json';
import c3415 from '../data/china/geometryCouties/3415.json';
import c3416 from '../data/china/geometryCouties/3416.json';
import c3417 from '../data/china/geometryCouties/3417.json';
import c3418 from '../data/china/geometryCouties/3418.json';
import c3501 from '../data/china/geometryCouties/3501.json';
import c3502 from '../data/china/geometryCouties/3502.json';
import c3503 from '../data/china/geometryCouties/3503.json';
import c3504 from '../data/china/geometryCouties/3504.json';
import c3505 from '../data/china/geometryCouties/3505.json';
import c3506 from '../data/china/geometryCouties/3506.json';
import c3507 from '../data/china/geometryCouties/3507.json';
import c3508 from '../data/china/geometryCouties/3508.json';
import c3509 from '../data/china/geometryCouties/3509.json';
import c3601 from '../data/china/geometryCouties/3601.json';
import c3602 from '../data/china/geometryCouties/3602.json';
import c3603 from '../data/china/geometryCouties/3603.json';
import c3604 from '../data/china/geometryCouties/3604.json';
import c3605 from '../data/china/geometryCouties/3605.json';
import c3606 from '../data/china/geometryCouties/3606.json';
import c3607 from '../data/china/geometryCouties/3607.json';
import c3608 from '../data/china/geometryCouties/3608.json';
import c3609 from '../data/china/geometryCouties/3609.json';
import c3610 from '../data/china/geometryCouties/3610.json';
import c3611 from '../data/china/geometryCouties/3611.json';
import c3701 from '../data/china/geometryCouties/3701.json';
import c3702 from '../data/china/geometryCouties/3702.json';
import c3703 from '../data/china/geometryCouties/3703.json';
import c3704 from '../data/china/geometryCouties/3704.json';
import c3705 from '../data/china/geometryCouties/3705.json';
import c3706 from '../data/china/geometryCouties/3706.json';
import c3707 from '../data/china/geometryCouties/3707.json';
import c3708 from '../data/china/geometryCouties/3708.json';
import c3709 from '../data/china/geometryCouties/3709.json';
import c3710 from '../data/china/geometryCouties/3710.json';
import c3711 from '../data/china/geometryCouties/3711.json';
import c3712 from '../data/china/geometryCouties/3712.json';
import c3713 from '../data/china/geometryCouties/3713.json';
import c3714 from '../data/china/geometryCouties/3714.json';
import c3715 from '../data/china/geometryCouties/3715.json';
import c3716 from '../data/china/geometryCouties/3716.json';
import c3717 from '../data/china/geometryCouties/3717.json';
import c4101 from '../data/china/geometryCouties/4101.json';
import c4102 from '../data/china/geometryCouties/4102.json';
import c4103 from '../data/china/geometryCouties/4103.json';
import c4104 from '../data/china/geometryCouties/4104.json';
import c4105 from '../data/china/geometryCouties/4105.json';
import c4106 from '../data/china/geometryCouties/4106.json';
import c4107 from '../data/china/geometryCouties/4107.json';
import c4108 from '../data/china/geometryCouties/4108.json';
import c4109 from '../data/china/geometryCouties/4109.json';
import c4110 from '../data/china/geometryCouties/4110.json';
import c4111 from '../data/china/geometryCouties/4111.json';
import c4112 from '../data/china/geometryCouties/4112.json';
import c4113 from '../data/china/geometryCouties/4113.json';
import c4114 from '../data/china/geometryCouties/4114.json';
import c4115 from '../data/china/geometryCouties/4115.json';
import c4116 from '../data/china/geometryCouties/4116.json';
import c4117 from '../data/china/geometryCouties/4117.json';
import c4201 from '../data/china/geometryCouties/4201.json';
import c4202 from '../data/china/geometryCouties/4202.json';
import c4203 from '../data/china/geometryCouties/4203.json';
import c4205 from '../data/china/geometryCouties/4205.json';
import c4206 from '../data/china/geometryCouties/4206.json';
import c4207 from '../data/china/geometryCouties/4207.json';
import c4208 from '../data/china/geometryCouties/4208.json';
import c4209 from '../data/china/geometryCouties/4209.json';
import c4210 from '../data/china/geometryCouties/4210.json';
import c4211 from '../data/china/geometryCouties/4211.json';
import c4212 from '../data/china/geometryCouties/4212.json';
import c4213 from '../data/china/geometryCouties/4213.json';
import c4228 from '../data/china/geometryCouties/4228.json';
import c4290 from '../data/china/geometryCouties/4290.json';
import c4301 from '../data/china/geometryCouties/4301.json';
import c4302 from '../data/china/geometryCouties/4302.json';
import c4303 from '../data/china/geometryCouties/4303.json';
import c4304 from '../data/china/geometryCouties/4304.json';
import c4305 from '../data/china/geometryCouties/4305.json';
import c4306 from '../data/china/geometryCouties/4306.json';
import c4307 from '../data/china/geometryCouties/4307.json';
import c4308 from '../data/china/geometryCouties/4308.json';
import c4309 from '../data/china/geometryCouties/4309.json';
import c4310 from '../data/china/geometryCouties/4310.json';
import c4311 from '../data/china/geometryCouties/4311.json';
import c4312 from '../data/china/geometryCouties/4312.json';
import c4313 from '../data/china/geometryCouties/4313.json';
import c4331 from '../data/china/geometryCouties/4331.json';
import c4401 from '../data/china/geometryCouties/4401.json';
import c4402 from '../data/china/geometryCouties/4402.json';
import c4403 from '../data/china/geometryCouties/4403.json';
import c4404 from '../data/china/geometryCouties/4404.json';
import c4405 from '../data/china/geometryCouties/4405.json';
import c4406 from '../data/china/geometryCouties/4406.json';
import c4407 from '../data/china/geometryCouties/4407.json';
import c4408 from '../data/china/geometryCouties/4408.json';
import c4409 from '../data/china/geometryCouties/4409.json';
import c4412 from '../data/china/geometryCouties/4412.json';
import c4413 from '../data/china/geometryCouties/4413.json';
import c4414 from '../data/china/geometryCouties/4414.json';
import c4415 from '../data/china/geometryCouties/4415.json';
import c4416 from '../data/china/geometryCouties/4416.json';
import c4417 from '../data/china/geometryCouties/4417.json';
import c4418 from '../data/china/geometryCouties/4418.json';
import c4419 from '../data/china/geometryCouties/4419.json';
import c4420 from '../data/china/geometryCouties/4420.json';
import c4451 from '../data/china/geometryCouties/4451.json';
import c4452 from '../data/china/geometryCouties/4452.json';
import c4453 from '../data/china/geometryCouties/4453.json';
import c4501 from '../data/china/geometryCouties/4501.json';
import c4502 from '../data/china/geometryCouties/4502.json';
import c4503 from '../data/china/geometryCouties/4503.json';
import c4504 from '../data/china/geometryCouties/4504.json';
import c4505 from '../data/china/geometryCouties/4505.json';
import c4506 from '../data/china/geometryCouties/4506.json';
import c4507 from '../data/china/geometryCouties/4507.json';
import c4508 from '../data/china/geometryCouties/4508.json';
import c4509 from '../data/china/geometryCouties/4509.json';
import c4510 from '../data/china/geometryCouties/4510.json';
import c4511 from '../data/china/geometryCouties/4511.json';
import c4512 from '../data/china/geometryCouties/4512.json';
import c4513 from '../data/china/geometryCouties/4513.json';
import c4514 from '../data/china/geometryCouties/4514.json';
import c4601 from '../data/china/geometryCouties/4601.json';
import c4602 from '../data/china/geometryCouties/4602.json';
import c4603 from '../data/china/geometryCouties/4603.json';
import c4690 from '../data/china/geometryCouties/4690.json';
import c5001 from '../data/china/geometryCouties/5001.json';
import c5101 from '../data/china/geometryCouties/5101.json';
import c5103 from '../data/china/geometryCouties/5103.json';
import c5104 from '../data/china/geometryCouties/5104.json';
import c5105 from '../data/china/geometryCouties/5105.json';
import c5106 from '../data/china/geometryCouties/5106.json';
import c5107 from '../data/china/geometryCouties/5107.json';
import c5108 from '../data/china/geometryCouties/5108.json';
import c5109 from '../data/china/geometryCouties/5109.json';
import c5110 from '../data/china/geometryCouties/5110.json';
import c5111 from '../data/china/geometryCouties/5111.json';
import c5113 from '../data/china/geometryCouties/5113.json';
import c5114 from '../data/china/geometryCouties/5114.json';
import c5115 from '../data/china/geometryCouties/5115.json';
import c5116 from '../data/china/geometryCouties/5116.json';
import c5117 from '../data/china/geometryCouties/5117.json';
import c5118 from '../data/china/geometryCouties/5118.json';
import c5119 from '../data/china/geometryCouties/5119.json';
import c5120 from '../data/china/geometryCouties/5120.json';
import c5132 from '../data/china/geometryCouties/5132.json';
import c5133 from '../data/china/geometryCouties/5133.json';
import c5134 from '../data/china/geometryCouties/5134.json';
import c5201 from '../data/china/geometryCouties/5201.json';
import c5202 from '../data/china/geometryCouties/5202.json';
import c5203 from '../data/china/geometryCouties/5203.json';
import c5204 from '../data/china/geometryCouties/5204.json';
import c5222 from '../data/china/geometryCouties/5222.json';
import c5223 from '../data/china/geometryCouties/5223.json';
import c5224 from '../data/china/geometryCouties/5224.json';
import c5226 from '../data/china/geometryCouties/5226.json';
import c5227 from '../data/china/geometryCouties/5227.json';
import c5301 from '../data/china/geometryCouties/5301.json';
import c5303 from '../data/china/geometryCouties/5303.json';
import c5304 from '../data/china/geometryCouties/5304.json';
import c5305 from '../data/china/geometryCouties/5305.json';
import c5306 from '../data/china/geometryCouties/5306.json';
import c5307 from '../data/china/geometryCouties/5307.json';
import c5308 from '../data/china/geometryCouties/5308.json';
import c5309 from '../data/china/geometryCouties/5309.json';
import c5323 from '../data/china/geometryCouties/5323.json';
import c5325 from '../data/china/geometryCouties/5325.json';
import c5326 from '../data/china/geometryCouties/5326.json';
import c5328 from '../data/china/geometryCouties/5328.json';
import c5329 from '../data/china/geometryCouties/5329.json';
import c5331 from '../data/china/geometryCouties/5331.json';
import c5333 from '../data/china/geometryCouties/5333.json';
import c5334 from '../data/china/geometryCouties/5334.json';
import c5401 from '../data/china/geometryCouties/5401.json';
import c5421 from '../data/china/geometryCouties/5421.json';
import c5422 from '../data/china/geometryCouties/5422.json';
import c5423 from '../data/china/geometryCouties/5423.json';
import c5424 from '../data/china/geometryCouties/5424.json';
import c5425 from '../data/china/geometryCouties/5425.json';
import c5426 from '../data/china/geometryCouties/5426.json';
import c6101 from '../data/china/geometryCouties/6101.json';
import c6102 from '../data/china/geometryCouties/6102.json';
import c6103 from '../data/china/geometryCouties/6103.json';
import c6104 from '../data/china/geometryCouties/6104.json';
import c6105 from '../data/china/geometryCouties/6105.json';
import c6106 from '../data/china/geometryCouties/6106.json';
import c6107 from '../data/china/geometryCouties/6107.json';
import c6108 from '../data/china/geometryCouties/6108.json';
import c6109 from '../data/china/geometryCouties/6109.json';
import c6110 from '../data/china/geometryCouties/6110.json';
import c6201 from '../data/china/geometryCouties/6201.json';
import c6202 from '../data/china/geometryCouties/6202.json';
import c6203 from '../data/china/geometryCouties/6203.json';
import c6204 from '../data/china/geometryCouties/6204.json';
import c6205 from '../data/china/geometryCouties/6205.json';
import c6206 from '../data/china/geometryCouties/6206.json';
import c6207 from '../data/china/geometryCouties/6207.json';
import c6208 from '../data/china/geometryCouties/6208.json';
import c6209 from '../data/china/geometryCouties/6209.json';
import c6210 from '../data/china/geometryCouties/6210.json';
import c6211 from '../data/china/geometryCouties/6211.json';
import c6212 from '../data/china/geometryCouties/6212.json';
import c6229 from '../data/china/geometryCouties/6229.json';
import c6230 from '../data/china/geometryCouties/6230.json';
import c6301 from '../data/china/geometryCouties/6301.json';
import c6321 from '../data/china/geometryCouties/6321.json';
import c6322 from '../data/china/geometryCouties/6322.json';
import c6323 from '../data/china/geometryCouties/6323.json';
import c6325 from '../data/china/geometryCouties/6325.json';
import c6326 from '../data/china/geometryCouties/6326.json';
import c6327 from '../data/china/geometryCouties/6327.json';
import c6328 from '../data/china/geometryCouties/6328.json';
import c6401 from '../data/china/geometryCouties/6401.json';
import c6402 from '../data/china/geometryCouties/6402.json';
import c6403 from '../data/china/geometryCouties/6403.json';
import c6404 from '../data/china/geometryCouties/6404.json';
import c6405 from '../data/china/geometryCouties/6405.json';
import c6501 from '../data/china/geometryCouties/6501.json';
import c6502 from '../data/china/geometryCouties/6502.json';
import c6521 from '../data/china/geometryCouties/6521.json';
import c6522 from '../data/china/geometryCouties/6522.json';
import c6523 from '../data/china/geometryCouties/6523.json';
import c6527 from '../data/china/geometryCouties/6527.json';
import c6528 from '../data/china/geometryCouties/6528.json';
import c6529 from '../data/china/geometryCouties/6529.json';
import c6530 from '../data/china/geometryCouties/6530.json';
import c6531 from '../data/china/geometryCouties/6531.json';
import c6532 from '../data/china/geometryCouties/6532.json';
import c6540 from '../data/china/geometryCouties/6540.json';
import c6542 from '../data/china/geometryCouties/6542.json';
import c6543 from '../data/china/geometryCouties/6543.json';
import c6590 from '../data/china/geometryCouties/6590.json';
import c7100 from '../data/china/geometryCouties/7100.json';
import c8101 from '../data/china/geometryCouties/8101.json';
import c8200 from '../data/china/geometryCouties/8200.json';
import p11 from '../data/china/geometryProvince/11.json';
import p12 from '../data/china/geometryProvince/12.json';
import p13 from '../data/china/geometryProvince/13.json';
import p14 from '../data/china/geometryProvince/14.json';
import p15 from '../data/china/geometryProvince/15.json';
import p21 from '../data/china/geometryProvince/21.json';
import p22 from '../data/china/geometryProvince/22.json';
import p23 from '../data/china/geometryProvince/23.json';
import p31 from '../data/china/geometryProvince/31.json';
import p32 from '../data/china/geometryProvince/32.json';
import p33 from '../data/china/geometryProvince/33.json';
import p34 from '../data/china/geometryProvince/34.json';
import p35 from '../data/china/geometryProvince/35.json';
import p36 from '../data/china/geometryProvince/36.json';
import p37 from '../data/china/geometryProvince/37.json';
import p41 from '../data/china/geometryProvince/41.json';
import p42 from '../data/china/geometryProvince/42.json';
import p43 from '../data/china/geometryProvince/43.json';
import p44 from '../data/china/geometryProvince/44.json';
import p45 from '../data/china/geometryProvince/45.json';
import p46 from '../data/china/geometryProvince/46.json';
import p50 from '../data/china/geometryProvince/50.json';
import p51 from '../data/china/geometryProvince/51.json';
import p52 from '../data/china/geometryProvince/52.json';
import p53 from '../data/china/geometryProvince/53.json';
import p54 from '../data/china/geometryProvince/54.json';
import p61 from '../data/china/geometryProvince/61.json';
import p62 from '../data/china/geometryProvince/62.json';
import p63 from '../data/china/geometryProvince/63.json';
import p64 from '../data/china/geometryProvince/64.json';
import p65 from '../data/china/geometryProvince/65.json';
import p71 from '../data/china/geometryProvince/71.json';
import p81 from '../data/china/geometryProvince/81.json';
import p82 from '../data/china/geometryProvince/82.json';

export const GEO_DATA_MAP: Record<string, any> = {
  '/data/world/china.json': worldChina,
  '/data/world/japan.json': worldJapan,
  '/data/world/usa.json': worldUsa,
  '/data/china/china.json': china,
  '/data/china/geometryCouties/1101.json': c1101,
  '/data/china/geometryCouties/1201.json': c1201,
  '/data/china/geometryCouties/1301.json': c1301,
  '/data/china/geometryCouties/1302.json': c1302,
  '/data/china/geometryCouties/1303.json': c1303,
  '/data/china/geometryCouties/1304.json': c1304,
  '/data/china/geometryCouties/1305.json': c1305,
  '/data/china/geometryCouties/1306.json': c1306,
  '/data/china/geometryCouties/1307.json': c1307,
  '/data/china/geometryCouties/1308.json': c1308,
  '/data/china/geometryCouties/1309.json': c1309,
  '/data/china/geometryCouties/1310.json': c1310,
  '/data/china/geometryCouties/1311.json': c1311,
  '/data/china/geometryCouties/1401.json': c1401,
  '/data/china/geometryCouties/1402.json': c1402,
  '/data/china/geometryCouties/1403.json': c1403,
  '/data/china/geometryCouties/1404.json': c1404,
  '/data/china/geometryCouties/1405.json': c1405,
  '/data/china/geometryCouties/1406.json': c1406,
  '/data/china/geometryCouties/1407.json': c1407,
  '/data/china/geometryCouties/1408.json': c1408,
  '/data/china/geometryCouties/1409.json': c1409,
  '/data/china/geometryCouties/1410.json': c1410,
  '/data/china/geometryCouties/1411.json': c1411,
  '/data/china/geometryCouties/1501.json': c1501,
  '/data/china/geometryCouties/1502.json': c1502,
  '/data/china/geometryCouties/1503.json': c1503,
  '/data/china/geometryCouties/1504.json': c1504,
  '/data/china/geometryCouties/1505.json': c1505,
  '/data/china/geometryCouties/1506.json': c1506,
  '/data/china/geometryCouties/1507.json': c1507,
  '/data/china/geometryCouties/1508.json': c1508,
  '/data/china/geometryCouties/1509.json': c1509,
  '/data/china/geometryCouties/1522.json': c1522,
  '/data/china/geometryCouties/1525.json': c1525,
  '/data/china/geometryCouties/1529.json': c1529,
  '/data/china/geometryCouties/2101.json': c2101,
  '/data/china/geometryCouties/2102.json': c2102,
  '/data/china/geometryCouties/2103.json': c2103,
  '/data/china/geometryCouties/2104.json': c2104,
  '/data/china/geometryCouties/2105.json': c2105,
  '/data/china/geometryCouties/2106.json': c2106,
  '/data/china/geometryCouties/2107.json': c2107,
  '/data/china/geometryCouties/2108.json': c2108,
  '/data/china/geometryCouties/2109.json': c2109,
  '/data/china/geometryCouties/2110.json': c2110,
  '/data/china/geometryCouties/2111.json': c2111,
  '/data/china/geometryCouties/2112.json': c2112,
  '/data/china/geometryCouties/2113.json': c2113,
  '/data/china/geometryCouties/2114.json': c2114,
  '/data/china/geometryCouties/2201.json': c2201,
  '/data/china/geometryCouties/2202.json': c2202,
  '/data/china/geometryCouties/2203.json': c2203,
  '/data/china/geometryCouties/2204.json': c2204,
  '/data/china/geometryCouties/2205.json': c2205,
  '/data/china/geometryCouties/2206.json': c2206,
  '/data/china/geometryCouties/2207.json': c2207,
  '/data/china/geometryCouties/2208.json': c2208,
  '/data/china/geometryCouties/2224.json': c2224,
  '/data/china/geometryCouties/2301.json': c2301,
  '/data/china/geometryCouties/2302.json': c2302,
  '/data/china/geometryCouties/2303.json': c2303,
  '/data/china/geometryCouties/2304.json': c2304,
  '/data/china/geometryCouties/2305.json': c2305,
  '/data/china/geometryCouties/2306.json': c2306,
  '/data/china/geometryCouties/2307.json': c2307,
  '/data/china/geometryCouties/2308.json': c2308,
  '/data/china/geometryCouties/2309.json': c2309,
  '/data/china/geometryCouties/2310.json': c2310,
  '/data/china/geometryCouties/2311.json': c2311,
  '/data/china/geometryCouties/2312.json': c2312,
  '/data/china/geometryCouties/2327.json': c2327,
  '/data/china/geometryCouties/3101.json': c3101,
  '/data/china/geometryCouties/3102.json': c3102,
  '/data/china/geometryCouties/3201.json': c3201,
  '/data/china/geometryCouties/3202.json': c3202,
  '/data/china/geometryCouties/3203.json': c3203,
  '/data/china/geometryCouties/3204.json': c3204,
  '/data/china/geometryCouties/3205.json': c3205,
  '/data/china/geometryCouties/3206.json': c3206,
  '/data/china/geometryCouties/3207.json': c3207,
  '/data/china/geometryCouties/3208.json': c3208,
  '/data/china/geometryCouties/3209.json': c3209,
  '/data/china/geometryCouties/3210.json': c3210,
  '/data/china/geometryCouties/3211.json': c3211,
  '/data/china/geometryCouties/3212.json': c3212,
  '/data/china/geometryCouties/3213.json': c3213,
  '/data/china/geometryCouties/3301.json': c3301,
  '/data/china/geometryCouties/3302.json': c3302,
  '/data/china/geometryCouties/3303.json': c3303,
  '/data/china/geometryCouties/3304.json': c3304,
  '/data/china/geometryCouties/3305.json': c3305,
  '/data/china/geometryCouties/3306.json': c3306,
  '/data/china/geometryCouties/3307.json': c3307,
  '/data/china/geometryCouties/3308.json': c3308,
  '/data/china/geometryCouties/3309.json': c3309,
  '/data/china/geometryCouties/3310.json': c3310,
  '/data/china/geometryCouties/3311.json': c3311,
  '/data/china/geometryCouties/3401.json': c3401,
  '/data/china/geometryCouties/3402.json': c3402,
  '/data/china/geometryCouties/3403.json': c3403,
  '/data/china/geometryCouties/3404.json': c3404,
  '/data/china/geometryCouties/3405.json': c3405,
  '/data/china/geometryCouties/3406.json': c3406,
  '/data/china/geometryCouties/3407.json': c3407,
  '/data/china/geometryCouties/3408.json': c3408,
  '/data/china/geometryCouties/3410.json': c3410,
  '/data/china/geometryCouties/3411.json': c3411,
  '/data/china/geometryCouties/3412.json': c3412,
  '/data/china/geometryCouties/3413.json': c3413,
  '/data/china/geometryCouties/3415.json': c3415,
  '/data/china/geometryCouties/3416.json': c3416,
  '/data/china/geometryCouties/3417.json': c3417,
  '/data/china/geometryCouties/3418.json': c3418,
  '/data/china/geometryCouties/3501.json': c3501,
  '/data/china/geometryCouties/3502.json': c3502,
  '/data/china/geometryCouties/3503.json': c3503,
  '/data/china/geometryCouties/3504.json': c3504,
  '/data/china/geometryCouties/3505.json': c3505,
  '/data/china/geometryCouties/3506.json': c3506,
  '/data/china/geometryCouties/3507.json': c3507,
  '/data/china/geometryCouties/3508.json': c3508,
  '/data/china/geometryCouties/3509.json': c3509,
  '/data/china/geometryCouties/3601.json': c3601,
  '/data/china/geometryCouties/3602.json': c3602,
  '/data/china/geometryCouties/3603.json': c3603,
  '/data/china/geometryCouties/3604.json': c3604,
  '/data/china/geometryCouties/3605.json': c3605,
  '/data/china/geometryCouties/3606.json': c3606,
  '/data/china/geometryCouties/3607.json': c3607,
  '/data/china/geometryCouties/3608.json': c3608,
  '/data/china/geometryCouties/3609.json': c3609,
  '/data/china/geometryCouties/3610.json': c3610,
  '/data/china/geometryCouties/3611.json': c3611,
  '/data/china/geometryCouties/3701.json': c3701,
  '/data/china/geometryCouties/3702.json': c3702,
  '/data/china/geometryCouties/3703.json': c3703,
  '/data/china/geometryCouties/3704.json': c3704,
  '/data/china/geometryCouties/3705.json': c3705,
  '/data/china/geometryCouties/3706.json': c3706,
  '/data/china/geometryCouties/3707.json': c3707,
  '/data/china/geometryCouties/3708.json': c3708,
  '/data/china/geometryCouties/3709.json': c3709,
  '/data/china/geometryCouties/3710.json': c3710,
  '/data/china/geometryCouties/3711.json': c3711,
  '/data/china/geometryCouties/3712.json': c3712,
  '/data/china/geometryCouties/3713.json': c3713,
  '/data/china/geometryCouties/3714.json': c3714,
  '/data/china/geometryCouties/3715.json': c3715,
  '/data/china/geometryCouties/3716.json': c3716,
  '/data/china/geometryCouties/3717.json': c3717,
  '/data/china/geometryCouties/4101.json': c4101,
  '/data/china/geometryCouties/4102.json': c4102,
  '/data/china/geometryCouties/4103.json': c4103,
  '/data/china/geometryCouties/4104.json': c4104,
  '/data/china/geometryCouties/4105.json': c4105,
  '/data/china/geometryCouties/4106.json': c4106,
  '/data/china/geometryCouties/4107.json': c4107,
  '/data/china/geometryCouties/4108.json': c4108,
  '/data/china/geometryCouties/4109.json': c4109,
  '/data/china/geometryCouties/4110.json': c4110,
  '/data/china/geometryCouties/4111.json': c4111,
  '/data/china/geometryCouties/4112.json': c4112,
  '/data/china/geometryCouties/4113.json': c4113,
  '/data/china/geometryCouties/4114.json': c4114,
  '/data/china/geometryCouties/4115.json': c4115,
  '/data/china/geometryCouties/4116.json': c4116,
  '/data/china/geometryCouties/4117.json': c4117,
  '/data/china/geometryCouties/4201.json': c4201,
  '/data/china/geometryCouties/4202.json': c4202,
  '/data/china/geometryCouties/4203.json': c4203,
  '/data/china/geometryCouties/4205.json': c4205,
  '/data/china/geometryCouties/4206.json': c4206,
  '/data/china/geometryCouties/4207.json': c4207,
  '/data/china/geometryCouties/4208.json': c4208,
  '/data/china/geometryCouties/4209.json': c4209,
  '/data/china/geometryCouties/4210.json': c4210,
  '/data/china/geometryCouties/4211.json': c4211,
  '/data/china/geometryCouties/4212.json': c4212,
  '/data/china/geometryCouties/4213.json': c4213,
  '/data/china/geometryCouties/4228.json': c4228,
  '/data/china/geometryCouties/4290.json': c4290,
  '/data/china/geometryCouties/4301.json': c4301,
  '/data/china/geometryCouties/4302.json': c4302,
  '/data/china/geometryCouties/4303.json': c4303,
  '/data/china/geometryCouties/4304.json': c4304,
  '/data/china/geometryCouties/4305.json': c4305,
  '/data/china/geometryCouties/4306.json': c4306,
  '/data/china/geometryCouties/4307.json': c4307,
  '/data/china/geometryCouties/4308.json': c4308,
  '/data/china/geometryCouties/4309.json': c4309,
  '/data/china/geometryCouties/4310.json': c4310,
  '/data/china/geometryCouties/4311.json': c4311,
  '/data/china/geometryCouties/4312.json': c4312,
  '/data/china/geometryCouties/4313.json': c4313,
  '/data/china/geometryCouties/4331.json': c4331,
  '/data/china/geometryCouties/4401.json': c4401,
  '/data/china/geometryCouties/4402.json': c4402,
  '/data/china/geometryCouties/4403.json': c4403,
  '/data/china/geometryCouties/4404.json': c4404,
  '/data/china/geometryCouties/4405.json': c4405,
  '/data/china/geometryCouties/4406.json': c4406,
  '/data/china/geometryCouties/4407.json': c4407,
  '/data/china/geometryCouties/4408.json': c4408,
  '/data/china/geometryCouties/4409.json': c4409,
  '/data/china/geometryCouties/4412.json': c4412,
  '/data/china/geometryCouties/4413.json': c4413,
  '/data/china/geometryCouties/4414.json': c4414,
  '/data/china/geometryCouties/4415.json': c4415,
  '/data/china/geometryCouties/4416.json': c4416,
  '/data/china/geometryCouties/4417.json': c4417,
  '/data/china/geometryCouties/4418.json': c4418,
  '/data/china/geometryCouties/4419.json': c4419,
  '/data/china/geometryCouties/4420.json': c4420,
  '/data/china/geometryCouties/4451.json': c4451,
  '/data/china/geometryCouties/4452.json': c4452,
  '/data/china/geometryCouties/4453.json': c4453,
  '/data/china/geometryCouties/4501.json': c4501,
  '/data/china/geometryCouties/4502.json': c4502,
  '/data/china/geometryCouties/4503.json': c4503,
  '/data/china/geometryCouties/4504.json': c4504,
  '/data/china/geometryCouties/4505.json': c4505,
  '/data/china/geometryCouties/4506.json': c4506,
  '/data/china/geometryCouties/4507.json': c4507,
  '/data/china/geometryCouties/4508.json': c4508,
  '/data/china/geometryCouties/4509.json': c4509,
  '/data/china/geometryCouties/4510.json': c4510,
  '/data/china/geometryCouties/4511.json': c4511,
  '/data/china/geometryCouties/4512.json': c4512,
  '/data/china/geometryCouties/4513.json': c4513,
  '/data/china/geometryCouties/4514.json': c4514,
  '/data/china/geometryCouties/4601.json': c4601,
  '/data/china/geometryCouties/4602.json': c4602,
  '/data/china/geometryCouties/4603.json': c4603,
  '/data/china/geometryCouties/4690.json': c4690,
  '/data/china/geometryCouties/5001.json': c5001,
  '/data/china/geometryCouties/5101.json': c5101,
  '/data/china/geometryCouties/5103.json': c5103,
  '/data/china/geometryCouties/5104.json': c5104,
  '/data/china/geometryCouties/5105.json': c5105,
  '/data/china/geometryCouties/5106.json': c5106,
  '/data/china/geometryCouties/5107.json': c5107,
  '/data/china/geometryCouties/5108.json': c5108,
  '/data/china/geometryCouties/5109.json': c5109,
  '/data/china/geometryCouties/5110.json': c5110,
  '/data/china/geometryCouties/5111.json': c5111,
  '/data/china/geometryCouties/5113.json': c5113,
  '/data/china/geometryCouties/5114.json': c5114,
  '/data/china/geometryCouties/5115.json': c5115,
  '/data/china/geometryCouties/5116.json': c5116,
  '/data/china/geometryCouties/5117.json': c5117,
  '/data/china/geometryCouties/5118.json': c5118,
  '/data/china/geometryCouties/5119.json': c5119,
  '/data/china/geometryCouties/5120.json': c5120,
  '/data/china/geometryCouties/5132.json': c5132,
  '/data/china/geometryCouties/5133.json': c5133,
  '/data/china/geometryCouties/5134.json': c5134,
  '/data/china/geometryCouties/5201.json': c5201,
  '/data/china/geometryCouties/5202.json': c5202,
  '/data/china/geometryCouties/5203.json': c5203,
  '/data/china/geometryCouties/5204.json': c5204,
  '/data/china/geometryCouties/5222.json': c5222,
  '/data/china/geometryCouties/5223.json': c5223,
  '/data/china/geometryCouties/5224.json': c5224,
  '/data/china/geometryCouties/5226.json': c5226,
  '/data/china/geometryCouties/5227.json': c5227,
  '/data/china/geometryCouties/5301.json': c5301,
  '/data/china/geometryCouties/5303.json': c5303,
  '/data/china/geometryCouties/5304.json': c5304,
  '/data/china/geometryCouties/5305.json': c5305,
  '/data/china/geometryCouties/5306.json': c5306,
  '/data/china/geometryCouties/5307.json': c5307,
  '/data/china/geometryCouties/5308.json': c5308,
  '/data/china/geometryCouties/5309.json': c5309,
  '/data/china/geometryCouties/5323.json': c5323,
  '/data/china/geometryCouties/5325.json': c5325,
  '/data/china/geometryCouties/5326.json': c5326,
  '/data/china/geometryCouties/5328.json': c5328,
  '/data/china/geometryCouties/5329.json': c5329,
  '/data/china/geometryCouties/5331.json': c5331,
  '/data/china/geometryCouties/5333.json': c5333,
  '/data/china/geometryCouties/5334.json': c5334,
  '/data/china/geometryCouties/5401.json': c5401,
  '/data/china/geometryCouties/5421.json': c5421,
  '/data/china/geometryCouties/5422.json': c5422,
  '/data/china/geometryCouties/5423.json': c5423,
  '/data/china/geometryCouties/5424.json': c5424,
  '/data/china/geometryCouties/5425.json': c5425,
  '/data/china/geometryCouties/5426.json': c5426,
  '/data/china/geometryCouties/6101.json': c6101,
  '/data/china/geometryCouties/6102.json': c6102,
  '/data/china/geometryCouties/6103.json': c6103,
  '/data/china/geometryCouties/6104.json': c6104,
  '/data/china/geometryCouties/6105.json': c6105,
  '/data/china/geometryCouties/6106.json': c6106,
  '/data/china/geometryCouties/6107.json': c6107,
  '/data/china/geometryCouties/6108.json': c6108,
  '/data/china/geometryCouties/6109.json': c6109,
  '/data/china/geometryCouties/6110.json': c6110,
  '/data/china/geometryCouties/6201.json': c6201,
  '/data/china/geometryCouties/6202.json': c6202,
  '/data/china/geometryCouties/6203.json': c6203,
  '/data/china/geometryCouties/6204.json': c6204,
  '/data/china/geometryCouties/6205.json': c6205,
  '/data/china/geometryCouties/6206.json': c6206,
  '/data/china/geometryCouties/6207.json': c6207,
  '/data/china/geometryCouties/6208.json': c6208,
  '/data/china/geometryCouties/6209.json': c6209,
  '/data/china/geometryCouties/6210.json': c6210,
  '/data/china/geometryCouties/6211.json': c6211,
  '/data/china/geometryCouties/6212.json': c6212,
  '/data/china/geometryCouties/6229.json': c6229,
  '/data/china/geometryCouties/6230.json': c6230,
  '/data/china/geometryCouties/6301.json': c6301,
  '/data/china/geometryCouties/6321.json': c6321,
  '/data/china/geometryCouties/6322.json': c6322,
  '/data/china/geometryCouties/6323.json': c6323,
  '/data/china/geometryCouties/6325.json': c6325,
  '/data/china/geometryCouties/6326.json': c6326,
  '/data/china/geometryCouties/6327.json': c6327,
  '/data/china/geometryCouties/6328.json': c6328,
  '/data/china/geometryCouties/6401.json': c6401,
  '/data/china/geometryCouties/6402.json': c6402,
  '/data/china/geometryCouties/6403.json': c6403,
  '/data/china/geometryCouties/6404.json': c6404,
  '/data/china/geometryCouties/6405.json': c6405,
  '/data/china/geometryCouties/6501.json': c6501,
  '/data/china/geometryCouties/6502.json': c6502,
  '/data/china/geometryCouties/6521.json': c6521,
  '/data/china/geometryCouties/6522.json': c6522,
  '/data/china/geometryCouties/6523.json': c6523,
  '/data/china/geometryCouties/6527.json': c6527,
  '/data/china/geometryCouties/6528.json': c6528,
  '/data/china/geometryCouties/6529.json': c6529,
  '/data/china/geometryCouties/6530.json': c6530,
  '/data/china/geometryCouties/6531.json': c6531,
  '/data/china/geometryCouties/6532.json': c6532,
  '/data/china/geometryCouties/6540.json': c6540,
  '/data/china/geometryCouties/6542.json': c6542,
  '/data/china/geometryCouties/6543.json': c6543,
  '/data/china/geometryCouties/6590.json': c6590,
  '/data/china/geometryCouties/7100.json': c7100,
  '/data/china/geometryCouties/8101.json': c8101,
  '/data/china/geometryCouties/8200.json': c8200,
  '/data/china/geometryProvince/11.json': p11,
  '/data/china/geometryProvince/12.json': p12,
  '/data/china/geometryProvince/13.json': p13,
  '/data/china/geometryProvince/14.json': p14,
  '/data/china/geometryProvince/15.json': p15,
  '/data/china/geometryProvince/21.json': p21,
  '/data/china/geometryProvince/22.json': p22,
  '/data/china/geometryProvince/23.json': p23,
  '/data/china/geometryProvince/31.json': p31,
  '/data/china/geometryProvince/32.json': p32,
  '/data/china/geometryProvince/33.json': p33,
  '/data/china/geometryProvince/34.json': p34,
  '/data/china/geometryProvince/35.json': p35,
  '/data/china/geometryProvince/36.json': p36,
  '/data/china/geometryProvince/37.json': p37,
  '/data/china/geometryProvince/41.json': p41,
  '/data/china/geometryProvince/42.json': p42,
  '/data/china/geometryProvince/43.json': p43,
  '/data/china/geometryProvince/44.json': p44,
  '/data/china/geometryProvince/45.json': p45,
  '/data/china/geometryProvince/46.json': p46,
  '/data/china/geometryProvince/50.json': p50,
  '/data/china/geometryProvince/51.json': p51,
  '/data/china/geometryProvince/52.json': p52,
  '/data/china/geometryProvince/53.json': p53,
  '/data/china/geometryProvince/54.json': p54,
  '/data/china/geometryProvince/61.json': p61,
  '/data/china/geometryProvince/62.json': p62,
  '/data/china/geometryProvince/63.json': p63,
  '/data/china/geometryProvince/64.json': p64,
  '/data/china/geometryProvince/65.json': p65,
  '/data/china/geometryProvince/71.json': p71,
  '/data/china/geometryProvince/81.json': p81,
  '/data/china/geometryProvince/82.json': p82,
};
