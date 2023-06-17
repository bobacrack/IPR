package org.example;

public class ChatEntry {
    private Integer mId;
    private Integer mUidSender;
    private Integer mUidReceiver;
    private String mMessage;
    private Date mTimestamp;


    public ChatEntry(Integer aId, Integer aUidSender, Integer aUidReceiver, , String aMessage) {
        mId = aId;
        mUidSender = aUidSender;
        mUidReceiver = aUidReceiver;
        mMessage = aMessage;
        mTimestamp = new Date();


    }

    public void update(Integer aUidSender, Integer aUidReceiver, String aMessage) {
        mUidSender = aUidSender;
        mUidReceiver = aUidReceiver;
        mMessage = aMessage;
    }

    public Integer getmId() {
        return mId;
    }

     public Date getTimestampe() {
        return mTimestamp;
    }

    @Override
    public String toString() {
        return ("{\n\t\"Chat\": {\n\t\t\"id\":" + mId + "\n\t\t\"UidSender\":" + mUidSender
                + "\n\t\t\"UidReceiver\":\""
                + mUidReceiver + "\n\t\t\"Message\":\"" + mMessage + "\n\t\t\"Timestamp\":\"" + mTimestamp
                + "\"\n\t}\n}");
    }
}
