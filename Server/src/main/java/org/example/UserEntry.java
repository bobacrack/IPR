package org.example;

import java.util.Date;
import java.util.UUID;

public class UserEntry {
    private Integer mId;
    private String mUid;
    private String mFname;
    private String mLname;
    private Date mAge;
    private Integer mAgePref;
    private String mPicture;

    public String getmFname() {
        return mFname;
    }

    public String getmLname() {
        return mLname;
    }

    public Date getmAge() {
        return mAge;
    }

    public Integer getmAgePref() {
        return mAgePref;
    }

    public String getmPicture() {
        return mPicture;
    }

    UUID uuid = UUID.randomUUID();
    String uniqueId = uuid.toString();

    public UserEntry(Integer aId, String aFname, String aLname, Date aAge, Integer aAgePref, String aPicture) {
        mId = aId;
        mUid = uniqueId;
        mFname = aFname;
        mLname = aLname;
        mAge = aAge;
        mAgePref = aAgePref;
        mPicture = aPicture;
    }

    public void update(String aFname, String aLname, Date aAge, Integer aAgePref, String aPicture) {
        mFname = aFname;
        mLname = aLname;
        mAge = aAge;
        mAgePref = aAgePref;
        mPicture = aPicture;
    }

    public Integer getmId() {
        return mId;
    }

    public String getmUid() {
        return mUid;
    }

    @Override
    public String toString() {
        return ("{\n\t\"user\": {\n\t\t\"id\":" + mId + "\n\t\t\"uid\":" + mUid + "\n\t\t\"firstname\":\"" + mFname
                + "\"\n\t\t\"lastname\":\""
                + mLname + "\"\n\t\t\"age\":\"" + mAge + "\"\n\t\t\"agePreference\":\"" + mAgePref
                + "\"\n\t\t\"Picture\":\"" + mPicture + "\"\n\t}\n}");
    }
}
