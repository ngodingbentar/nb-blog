<template>
  <div class="about">
    <div class="text-3xl flex justify-center mb-8">filter object</div>
    <div>
      <div>ASLI</div>
      <div>
        <div v-for="(item, index) in response.data.response.billdetails" :key="item.billid">
          {{ index }} - billid : {{ item.billid }} - DENOM: {{ item.body[0].split(':')[1] }}
        </div>
      </div>
    </div>
    <div class="mt-8">
      <div>FILTERED</div>
      <div>
        <div v-for="(item, index) in final" :key="item.billid">
          {{ index }} - billid : {{ item.billid }} - DENOM: {{ item.body[0].split(':')[1] }}
        </div>
      </div>
    </div>
    <div class="mt-8">
      <div>ORIGINAL</div>
      <div>
        {{ response.data.response.billdetails }}
      </div>
    </div>
    <div class="mt-8">
      <div>FILTERED</div>
      <div>
        {{ final }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

const response = {
  "status": 200,
  "message": "success",
  "data": {
    "system_message": "SUCCESS",
    "response": {
      "additionaldata": [],
      "billdetails": [
        {
          "adminfee": "0.0",
          "billid": "8",
          "currency": "360",
          "file": "TELKOMSEL 50rb - 50.149",
          "totalamount": "50149.00",
          "description": null,
          "body": [
            "DENOM: 50000"
          ]
        },
        {
          "adminfee": "0.0",
          "billid": "9",
          "currency": "360",
          "file": "TELKOMSEL 75rb - 74.050",
          "totalamount": "74050.00",
          "description": null,
          "body": [
            "DENOM: 75000"
          ]
        },
        {
          "adminfee": "0.0",
          "billid": "10",
          "currency": "360",
          "file": "TELKOMSEL 100rb - 98.264",
          "totalamount": "98264.00",
          "description": null,
          "body": [
            "DENOM: 100000"
          ]
        },
        {
          "adminfee": "0.0",
          "billid": "11",
          "currency": "360",
          "file": "TELKOMSEL 150rb - 146.600",
          "totalamount": "146600.00",
          "description": null,
          "body": [
            "DENOM: 150000"
          ]
        },
        {
          "adminfee": "0.0",
          "billid": "12",
          "currency": "360",
          "file": "TELKOMSEL 200rb - 194.900",
          "totalamount": "194900.00",
          "description": null,
          "body": [
            "DENOM: 200000"
          ]
        },
      ],
      "billername": "PULSA TSEL",
      "inquiryid": "27190993",
      "paymenttype": "CLOSE_PAYMENT",
      "responsecode": "0000",
      "responsemsg": "SUCCESS",
      "subscriberid": "081311529594",
      "subscribername": ""
    },
    "trace": {
      "session_id": "81215A",
      "request_date_time": "201907",
      "words": "779",
      "account_number": "081311529594",
      "systrace": 156,
      "inquiry_id": "27190993",
    }
  }
}

const final = response.data.response.billdetails.filter((item) => Number(item.body[0].split(':')[1]) >= 100000);
</script>

<style>
.about {
  @apply m-4;
}
</style>
