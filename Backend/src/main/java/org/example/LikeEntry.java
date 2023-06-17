package org.example;

public class LikeEntry {
    private Integer mId;
    private String mUidLiker;
    private String mUidLiked;

    private static int sNextId = 1;

    public LikeEntry(String aUidLiker, String aUidLiked) {
        mId = sNextId++;
        mUidLiker = aUidLiker;
        mUidLiked = aUidLiked;

    }

    public void update(String aUidLiker, String aUidLiked) {
        mUidLiker = aUidLiker;
        mUidLiked = aUidLiked;

    }

    public Integer getmId() {
        return mId;
    }

    @Override
    public String toString() {
        return ("{\n\t\"Messag\": {\n\t\t\"id\":" + mId + "\n\t\t\"UidSender\":" + mUidLiker
                + "\n\t\t\"UidReceiver\":\""
                + mUidLiked
                + "\"\n\t}\n}");
    }
}
